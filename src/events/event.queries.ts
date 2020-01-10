import MEvent from "./event"
import EventSQL from "./event.sql"

export const queries = {
    getEvents: async (_: any, raw: any) => { 
        let eventSQL = new EventSQL()
        const result = await eventSQL.getEvents()
        const eventsRaw: any[] = result.rows
        const events = eventsRaw.map((raw) => { return new MEvent(raw) })
        return events
    }
}