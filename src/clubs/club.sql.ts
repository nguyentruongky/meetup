import { runQuery } from "../db/connection"
import MClub from "./club"
import { esc, escRaw, escapeObject } from "../utils/utils"

export default class EventSQL {
    async create(event: MClub) {
        const hostIds = event.host.map(host => {
            return host.id
        })
        const hostIdString = hostIds.join(",")

        const dict: any = {
            id: event.id,
            title: event.title,
            description: event.description,
            hostIds: hostIdString,
            startAt: event.time.startAt,
            endAt: event.time.endAt,
            lat: event.location.lat,
            long: event.location.long,
            locationNotes: event.location.locationNotes,
            slotCount: event.slotCount,
            frequency: event.frequency,
            coverImageUrl: event.coverImageUrl,
            createdAt: new Date().getUTCSeconds()
        }
        let query = `insert into events (%1) values (%2)`
        const insertValue = escapeObject(dict)
        query = query.replace("%1", insertValue.key)
        query = query.replace("%2", insertValue.value)

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
