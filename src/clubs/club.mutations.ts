import * as Types from "../resolvers-types"
import * as Builder from "../utils/builder"
import * as SQL from "../utils/sql"
import StripeHelper from "../utils/stripeHelper"
import * as MError from "../utils/MError"
import { addFee } from "./club.sql"
export const mutations: Types.MutationResolvers = {
    createClub: (root, args, ctx) => {
        const creator: Types.MUser = ctx.user
        if (creator == undefined) {
            throw MError.Forbidden
        }

        const input: Types.CreateClubInput = args.input
        const club = Builder.Club.MClubBuilder.createFromInput(input)
        let errorMessage = ""
        if (club.title === "") {
            errorMessage = "Title is empty"
        }
        if (club.description === "") {
            errorMessage = "Description is empty"
        }
        if (club.location.address === "") {
            errorMessage = "Where does the event happen?"
        }
        if (club.location.lat === 0 || club.location.long === 0) {
            errorMessage = "Invalid location address"
        }
        if (club.slotCount === undefined) {
            club.slotCount = 0
        }

        if (errorMessage !== "") {
            throw MError.create(MError.Type.BAD_REQUEST, errorMessage)
        }

        let host: Types.MUser[] = [creator]
        if (club.host) {
            club.host.push(creator)
            host = club.host
        }
        club.host = host
        SQL.Club.create(club)

        if (club.fee) {
            club.fee.clubId = club.id
            addFee(club.fee)
        }

        return club
    },

    joinClub: (root, args, ctx): Promise<Types.ClubAttendanceResult> => {
        const attendee: Types.MUser = ctx.user
        if (attendee == undefined) {
            throw MError.Unauthorized
        }
        const clubId = args.clubId
        return joinClubIfAvailable(clubId, attendee)
    },

    quitClub: (root, args, ctx): Promise<Types.ClubAttendanceResult> => {
        const attendee: Types.MUser = ctx.user
        if (attendee == undefined) {
            throw new Error("You have to login")
        }
        const clubId = args.clubId
        return SQL.Club.quitClub(clubId, attendee.id).then(result => {
            if (result.rowCount === 1) {
                return Builder.Club.ClubAttendanceResultBuilder.create(
                    Types.ClubAttendanceStatus.Success
                )
            }

            return Builder.Club.ClubAttendanceResultBuilder.create(
                Types.ClubAttendanceStatus.Fail,
                "You don't register to this club"
            )
        })
    },

    addFee: async (root, args, ctx): Promise<Types.Fee> => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw MError.Unauthorized
        }

        const clubId = args.fee.clubId
        if (!clubId) {
            throw MError.create(MError.Type.BAD_REQUEST, "No clubId provided")
        }
        const isOwner = await checkClubOwner(clubId, user.id)
        if (isOwner == false) {
            throw MError.Forbidden
        }

        const fee = Builder.Club.FeeBuilder.create(args.fee)
        return SQL.Club.addFee(fee).then(result => {
            return fee
        })
    }

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

async function joinClubIfAvailable(clubId: string, user: Types.MUser) {
    const result = await SQL.Club.getClub(clubId)
    const clubsRaw: any[] = result.rows
    if (clubsRaw.length === 0) {
        throw new Error(`Can't find club with id ${clubId}`)
    }
    const club = Builder.Club.MClubBuilder.create(clubsRaw[0])
    const attendeesRaw: any[] = (await SQL.Club.getAttendees(clubId)).rows
    const attendees = attendeesRaw.map(raw => {
        return Builder.User.MUserBuilder.create(raw).id
    })

    const attendeeCount = attendees.length
    const slotCount = club.slotCount === undefined ? 0 : club.slotCount

    if (attendees.includes(user.id)) {
        return Builder.Club.ClubAttendanceResultBuilder.create(
            Types.ClubAttendanceStatus.Fail,
            "You registed this event"
        )
    }

    if (slotCount <= attendeeCount) {
        return Builder.Club.ClubAttendanceResultBuilder.create(
            Types.ClubAttendanceStatus.Fail,
            "This club reached the attendee limit"
        )
    }

    // get fee tier
    let isFree = true
    let fee: Types.Fee
    const feeTiersRaw = (await SQL.Club.getFeesOfClub(clubId)).rows
    if (feeTiersRaw.length > 0) {
        fee = Builder.Club.FeeBuilder.create(feeTiersRaw[0])
        isFree = false
    }

    if (isFree == false) {
        const striper = new StripeHelper()
        // check stripe account created
        let stripeUserId = user.stripeUserId
        if (stripeUserId === undefined) {
            stripeUserId = await striper.createCustomer(user.email, user.name)
        }

        // check payment method
        const cards = await striper.cardList(stripeUserId)
        if (cards.length === 0) {
            return Builder.Club.ClubAttendanceResultBuilder.create(
                Types.ClubAttendanceStatus.NeedPaymentSource,
                "No card added"
            )
        }

        // start charging
        const cardId = cards[0].id
        const chargeResult: Types.EnrollOutput = await striper.charge(
            stripeUserId,
            cardId,
            fee.amount * 100,
            fee.currency
        )
        if (chargeResult.error) {
            return Builder.Club.ClubAttendanceResultBuilder.create(
                Types.ClubAttendanceStatus.Fail,
                chargeResult.error
            )
        } else {
            chargeResult.fee = fee
            SQL.Club.saveEnrollment(chargeResult, user.id)
        }
    }

    // save info
    await SQL.Club.joinClub(clubId, user.id)

    return Builder.Club.ClubAttendanceResultBuilder.create(
        Types.ClubAttendanceStatus.Success
    )
}

async function checkClubOwner(clubId: string, userId: string) {
    const result = await SQL.Club.getHostIds(clubId)
    if (result.rows.length <= 0) {
        throw new Error("Club doesn't exist")
    }

    const hostIds: string = result.rows[0].hostIds
    return hostIds.includes(userId)
}
