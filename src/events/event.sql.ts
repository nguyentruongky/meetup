import { runQuery } from "../db/connection"
import MEvent from "./event"

export default class EventSQL {
    async create(event: MEvent) {
        const query = `
        insert into events 
        (
            "id", 
            "title", 
            "description", 
            "hostId",
            "startAt", 
            "duration", 
            "address", 
            "lat", 
            "long", 
            "locationNotes", 
            "slotCount", 
            "createdAt") 
        values (
            '${event.id}',
            '${event.title}',
            '${event.description}',
            '${event.host.id}',
            ${event.time.startAt},
            ${event.time.duration},
            '${event.location.address}',
            ${event.location.lat},
            ${event.location.long},
            '${event.location.locationNotes}',
            ${event.slotCount},
            ${new Date().getUTCSeconds()}
        )
        `

        const result = await runQuery(query)
        return event
    }

    async getEvents() {
        const query = `select * from events`
        const result = await runQuery(query)
        return result
    }

    async getEvent(id: string) {
        const query = `select * from events where id = '${id}'`
        const result = await runQuery(query)
        return result
    }
}
