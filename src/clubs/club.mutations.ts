import {
    MClubBuilder,
    ClubAttendanceResultBuilder,
    MUserBuilder
} from "../utils/builder"
import {
    CreateClubInput,
    MUser,
    MClub,
    ClubAttendanceResult,
    ClubAttendanceStatus
} from "../resolvers-types"
import { MutationResolvers } from "resolvers-types"
import ClubSQL from "./club.sql"
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
                return ClubAttendanceResultBuilder.create(ClubAttendanceStatus.Success)
            }

            return ClubAttendanceResultBuilder.create(ClubAttendanceStatus.Fail, "You don't register to this club")
        })
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
