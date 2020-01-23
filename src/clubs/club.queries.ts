import ClubSQL from "./club.sql"
import * as Builder from "../utils/builder"
import * as Types from "../resolvers-types"

export const queries: Types.QueryResolvers = {
    clubs: (root, args, ctx) => {
        let eventSQL = new ClubSQL()
        return eventSQL.getClubs().then(result => {
            const eventsRaw: any[] = result.rows
            const events = eventsRaw.map(raw => {
                return Builder.Club.MClubBuilder.create(raw)
            })
            return events
        })
    },
    club: (root, args, ctx) => {
        const eventId = args.id
        let eventSQL = new ClubSQL()
        return eventSQL.getClub(eventId).then(result => {
            const eventsRaw: any[] = result.rows
            if (eventsRaw.length === 0) {
                return null
            } else {
                const club = Builder.Club.MClubBuilder.create(eventsRaw[0])
                return club
            }
        })
    },
    search: (root, args, ctx) => {
        const keyword = args.keyword
        let eventSQL = new ClubSQL()
        return eventSQL.searchByKeyword(keyword).then(result => {
            const eventsRaw: any[] = result.rows
            const events = eventsRaw.map(raw => {
                return Builder.Club.MClubBuilder.create(raw)
            })
            return events
        })
    }
}
