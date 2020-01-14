import { runQuery } from "../db/connection"
import MClub from "./club"
import { esc, escRaw } from "../utils/utils"

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
            "hostIds",
            "startAt", 
            "endAt", 
            "lat", 
            "long", 
            "locationNotes", 
            "slotCount", 
            "frequency",
            "createdAt") 
        values (
            '${event.id}',
            ${esc(event.title)},
            ${esc(event.description)},
            '${hostIdString}',
            ${event.time.startAt},
            ${event.time.endAt},
            ${event.location.lat},
            ${event.location.long},
            ${esc(event.location.locationNotes)},
            ${event.slotCount},
            '${event.frequency}',
            ${new Date().getUTCSeconds()}
        )
        `
        const result = await runQuery(query)
        return event
    }

    async getClubs() {
        const query = `select * from events`
        const result = await runQuery(query)
        return result
    }

    async getClub(id: string) {
        const query = `select * from events where id = '${id}'`
        const result = await runQuery(query)
        return result
    }

    async searchByKeyword(keyword: string) {
        const escKeyword = escRaw(keyword)
        const query = `select * from events where title like '%${escKeyword}%' or description like '%${escKeyword}%'`
        const result = await runQuery(query)
        return result
    }
}
