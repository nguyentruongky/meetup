import MEvent from "./event"
import EventSQL from "./event.sql"

export const queries = {
    getEvents: async (_: any, raw: any) => { 
        let eventSQL = new EventSQL()
        const result = await eventSQL.getEvents()
        const eventsRaw: any[] = result.rows
        const events = eventsRaw.map((raw) => { return new MEvent(raw) })
        return events
    },
    getEvent: async (_: any, raw: any) => { 
        const eventId = raw.id
        let eventSQL = new EventSQL()
        const result = await eventSQL.getEvent(eventId)
        const eventsRaw: any[] = result.rows
        if (eventsRaw.length === 0) { 
            return null
        } else {
            return new MEvent(eventsRaw[0])
        }
    }
}