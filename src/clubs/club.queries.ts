import MClub from "./club"
import EventSQL from "./club.sql"

export const queries = {
    clubs: (_: any, raw: any) => {
        let eventSQL = new EventSQL()
        return eventSQL.getClubs().then(result => {
            const eventsRaw: any[] = result.rows
            const events = eventsRaw.map(raw => {
                return new MClub(raw)
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
                const club = new MClub(eventsRaw[0])
                return club
            }
        })
    }
}
