import { runQuery } from "../db/connection"
import { esc, escRaw, escapeObject } from "../utils/utils"
import { MClub, Fee } from "../resolvers-types"

export default class ClubSQL {
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
            createdAt: Date.now()
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

    async getAttendees(clubId: string) {
        const query = `select * from "usersClubs", users where "clubId" = ${esc(clubId)} and users.id = "usersClubs"."userId"`
        const result = await runQuery(query)
        return result
    }

    async joinClub(clubId: string, userId: string) {
        const dict: any = {
            clubId,
            userId,
            joinedAt: Date.now()
        }
        let query = `insert into "usersClubs" (%1) values (%2)`
        const insertValue = escapeObject(dict)
        query = query.replace("%1", insertValue.key)
        query = query.replace("%2", insertValue.value)
        const result = await runQuery(query)
        return result
    }

    async quitClub(clubId: string, userId: String) {
        const query = `delete from "usersClubs" where "clubId" = ${esc(clubId)} and "userId" = ${esc(userId)}`
        const result = await runQuery(query)
        return result
    }
    
    async getHostIds(clubId: string) {
        const query = `select "hostIds" from events where id = ${esc(clubId)}`
        const result = await runQuery(query)
        return result
    }

    async addFee(fee: Fee) {
        const dict: any = {
            id: fee.id,
            clubId: fee.clubId,
            amount: fee.amount,
            currency: fee.currency,
            tierId: fee.tierId,
            tierDescription: fee.tierDescription,
            createdAt: Date.now()
        }
        let query = `insert into "clubFees" (%1) values (%2)`
        const insertValue = escapeObject(dict)
        query = query.replace("%1", insertValue.key)
        query = query.replace("%2", insertValue.value)
        const result = await runQuery(query)
        return result
    }
}
