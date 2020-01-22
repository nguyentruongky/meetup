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
    EnrollInput,
    EnrollOutput,
    MutationResolvers
} from "../resolvers-types"
import ClubSQL from "./club.sql"
import Striper from "../utils/striper"
export const mutations: MutationResolvers = {
    club: (root, args, ctx) => {
        const creator: MUser = ctx.user
        if (creator == undefined) {
            throw new Error("You don't have permission to create event.")
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
            throw new Error("You have to login")
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

    enroll: async (root, args, ctx): Promise<EnrollOutput> => {
        const user: MUser = ctx.user
        if (user == undefined) {
            throw new Error("You don't have permission to add fee")
        }
        const input = args.input
        const feeId = input.feeTierId
        const sql = new ClubSQL()
        const feeRaw = (await sql.getFee(feeId)).rows[0]
        const fee = FeeBuilder.create(feeRaw)
        const stripeUserId = user.stripeUserId

        const stripe = new Striper()
        const result = await stripe.charge(stripeUserId, input.cardId, fee.amount, fee.currency)
        result.fee = fee

        sql.saveEnrollment(result, user.id)
        return result
    }
}

async function joinClubIfAvailable(clubId: string, user: MUser) {
    const clubSQL = new ClubSQL()
    const result = await clubSQL.getClub(clubId)
    const clubsRaw: any[] = result.rows
    if (clubsRaw.length === 0) {
        throw new Error(`Can't find club with id ${clubId}`)
        return
    }
    const club = MClubBuilder.create(clubsRaw[0])
    const attendeesRaw: any[] = (await clubSQL.getAttendees(clubId)).rows
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

    // check payment

    // save info
    await clubSQL.joinClub(clubId, user.id)

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
