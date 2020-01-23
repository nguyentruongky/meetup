import {
    MClubBuilder,
    ClubAttendanceResultBuilder,
    MUserBuilder,
    FeeBuilder
} from "../utils/builder"
import {
    CreateClubInput,
    MUser,
    MClub,
    ClubAttendanceResult,
    ClubAttendanceStatus,
    Fee,
    EnrollOutput,
    MutationResolvers
} from "../resolvers-types"
import ClubSQL from "./club.sql"
import Striper from "../utils/striper"
import { MErrorType } from "../utils/MError"
export const mutations: MutationResolvers = {
    club: (root, args, ctx) => {
        const creator: MUser = ctx.user
        if (creator == undefined) {
            throw new Error(MErrorType.FORBIDDEN)
        }

        const input: CreateClubInput = args.input
        const club = MClubBuilder.createFromInput(input)
        if (club.title === "") {
            throw new Error("Title is empty")
        }
        if (club.description === "") {
            throw new Error("Description is empty")
        }
        if (club.time.startAt === 0) {
            throw new Error("When does the event  start?")
        }
        if (club.time.duration === 0) {
            throw new Error("How long does the event  last?")
        }
        if (club.location.address === "") {
            throw new Error("Where does the event happen?")
        }
        if (club.location.lat === 0 || club.location.long === 0) {
            throw new Error("Invalid location address")
        }
        if (club.slotCount === undefined) {
            club.slotCount = 0
        }

        let host: MUser[] = [creator]
        if (club.host !== undefined) {
            club.host.push(creator)
            host = club.host
        }
        club.host = host
        let sql = new ClubSQL()
        const newClub = sql.create(club)
        return newClub
    },

    joinClub: (root, args, ctx): Promise<ClubAttendanceResult> => {
        const attendee: MUser = ctx.user
        if (attendee == undefined) {
            throw new Error(MErrorType.UNAUTHORIZED)
        }
        const clubId = args.clubId
        return joinClubIfAvailable(clubId, attendee)
    },

    quitClub: (root, args, ctx): Promise<ClubAttendanceResult> => {
        const attendee: MUser = ctx.user
        if (attendee == undefined) {
            throw new Error("You have to login")
        }
        const clubId = args.clubId
        const sql = new ClubSQL()
        return sql.quitClub(clubId, attendee.id).then(result => {
            if (result.rowCount === 1) {
                return ClubAttendanceResultBuilder.create(
                    ClubAttendanceStatus.Success
                )
            }

            return ClubAttendanceResultBuilder.create(
                ClubAttendanceStatus.Fail,
                "You don't register to this club"
            )
        })
    },

    addFee: async (root, args, ctx): Promise<Fee> => {
        const user: MUser = ctx.user
        if (user == undefined) {
            throw new Error("You don't have permission to add fee")
        }

        const clubId = args.fee.clubId
        const isOwner = await checkClubOwner(clubId, user.id)
        if (isOwner == false) {
            throw new Error("You don't have permission to add fee")
        }

        const fee = FeeBuilder.create(args.fee)
        const sql = new ClubSQL()
        return sql.addFee(fee).then(result => {
            return fee
        })
    },

    // favorite: (root, args, ctx): Promise<Boolean> => {
    //     const user: MUser = ctx.user
    //     if (user == undefined) {
    //         throw new Error("Login needed")
    //     }

    //     const clubId = args.clubId
    //     const sql = new ClubSQL()
    //     return sql.setFavorite(clubId, user.id)
    // }
}

async function joinClubIfAvailable(clubId: string, user: MUser) {
    const sql = new ClubSQL()
    const result = await sql.getClub(clubId)
    const clubsRaw: any[] = result.rows
    if (clubsRaw.length === 0) {
        throw new Error(`Can't find club with id ${clubId}`)
    }
    const club = MClubBuilder.create(clubsRaw[0])
    const attendeesRaw: any[] = (await sql.getAttendees(clubId)).rows
    const attendees = attendeesRaw.map(raw => {
        return MUserBuilder.create(raw).id
    })

    const attendeeCount = attendees.length
    const slotCount = club.slotCount === undefined ? 0 : club.slotCount

    if (attendees.includes(user.id)) {
        return ClubAttendanceResultBuilder.create(
            ClubAttendanceStatus.Fail,
            "You registed this event"
        )
    }

    if (slotCount <= attendeeCount) {
        return ClubAttendanceResultBuilder.create(
            ClubAttendanceStatus.Fail,
            "This club reached the attendee limit"
        )
    }

    // get fee tier
    let isFree = true
    let fee: Fee
    const feeTiersRaw = (await sql.getFeesOfClub(clubId)).rows
    if (feeTiersRaw.length > 0) {
        fee = FeeBuilder.create(feeTiersRaw[0])
        isFree = false
    }

    if (isFree == false) {
        const striper = new Striper()
        // check stripe account created
        let stripeUserId = user.stripeUserId
        if (stripeUserId === undefined) {
            stripeUserId = await striper.createCustomer(user.email, user.name)
        }

        // check payment method
        const cards = await striper.cardList(stripeUserId)
        if (cards.length === 0) {
            return ClubAttendanceResultBuilder.create(
                ClubAttendanceStatus.NeedPaymentSource,
                "No card added"
            )
        }

        // start charging
        const cardId = cards[0].id
        const chargeResult: EnrollOutput = await striper.charge(
            stripeUserId,
            cardId,
            fee.amount * 100,
            fee.currency
        )
        if (chargeResult.error) {
            return ClubAttendanceResultBuilder.create(
                ClubAttendanceStatus.Fail,
                chargeResult.error
            )
        } else {
            chargeResult.fee = fee
            sql.saveEnrollment(chargeResult, user.id)
        }
    }

    // save info
    await sql.joinClub(clubId, user.id)

    return ClubAttendanceResultBuilder.create(ClubAttendanceStatus.Success)
}

async function checkClubOwner(clubId: string, userId: string) {
    const sql = new ClubSQL()
    const result = await sql.getHostIds(clubId)
    if (result.rows.length <= 0) {
        throw new Error("Club doesn't exist")
    }

    const hostIds: string = result.rows[0].hostIds
    return hostIds.includes(userId)
}
