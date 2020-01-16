import {MClub} from "../resolvers-types"
import EventSQL from "./club.sql"
import { MClubBuilder } from "../utils/builder"

export const queries = {
    clubs: (_: any, raw: any) => {
        let eventSQL = new EventSQL()
        return eventSQL.getClubs().then(result => {
            const eventsRaw: any[] = result.rows
            const events = eventsRaw.map(raw => {
                return MClubBuilder.create(raw)
            })
            return events
        })
    },

    club(_: any, raw: any) {
        const eventId = raw.id
        let eventSQL = new EventSQL()
        return eventSQL.getClub(eventId).then(result => {
            const eventsRaw: any[] = result.rows
            if (eventsRaw.length === 0) {
                return null
            } else {
                const club = MClubBuilder.create(eventsRaw[0])
                return club
            }
        })
    },

    search(_: any, raw: any) {
        const keyword = raw.keyword
        let eventSQL = new EventSQL()
        return eventSQL.searchByKeyword(keyword).then(result => {
            const eventsRaw: any[] = result.rows
            const events = eventsRaw.map(raw => {
                return MClubBuilder.create(raw)
            })
            return events
        })
    }
}
