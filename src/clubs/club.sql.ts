import { runQuery } from "../db/connection"
import MClub from "./club"

export default class EventSQL {
    async create(event: MClub) {
        const hostIds = event.host.map(host => {
            return host.id
        })
        const hostIdString = hostIds.join(",")

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
            '${hostIdString}',
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
