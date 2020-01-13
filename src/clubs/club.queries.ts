import MClub from "./club"
import EventSQL from "./club.sql"

export const queries = {
    getEvents: (_: any, raw: any) => {
        let eventSQL = new EventSQL()
        return eventSQL.getEvents().then(result => {
            const eventsRaw: any[] = result.rows
            const events = eventsRaw.map(raw => {
                return new MClub(raw)
            })
            return events
        })
    },

    getEvent(_: any, raw: any) {
        const eventId = raw.id
        let eventSQL = new EventSQL()
        eventSQL.getEvent(eventId).then(result => {
            const eventsRaw: any[] = result.rows
            if (eventsRaw.length === 0) {
                return null
            } else {
                return new MClub(eventsRaw[0])
            }
        })
    }
}
