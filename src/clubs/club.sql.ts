import { runQuery } from "../db/connection"
import * as Utility from "../utils/utils"
import * as Types from "../resolvers-types"

export default class ClubSQL {
    async create(event: Types.MClub) {
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
        let query = `insert into clubs (%1) values (%2)`
        const insertValue = Utility.escapeObject(dict)
        query = query.replace("%1", insertValue.key)
        query = query.replace("%2", insertValue.value)

        const result = await runQuery(query)
        return event
    }

    async getClubs() {
        const query = `select * from clubs`
        const result = await runQuery(query)
        return result
    }

    async getClub(id: string) {
        const query = `select * from clubs where id = '${id}'`
        const result = await runQuery(query)
        return result
    }

    async searchByKeyword(keyword: string) {
        const escKeyword = Utility.escRaw(keyword)
        const query = `select * from clubs where title like '%${escKeyword}%' or description like '%${escKeyword}%'`
        const result = await runQuery(query)
        return result
    }

    async getAttendees(clubId: string) {
        const query = `select * from "usersClubs", users where "clubId" = ${Utility.esc(
            clubId
        )} and users.id = "usersClubs"."userId"`
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
        const insertValue = Utility.escapeObject(dict)
        query = query.replace("%1", insertValue.key)
        query = query.replace("%2", insertValue.value)
        const result = await runQuery(query)
        return result
    }

    async quitClub(clubId: string, userId: String) {
        const query = `delete from "usersClubs" where "clubId" = ${Utility.esc(
            clubId
        )} and "userId" = ${Utility.esc(userId)}`
        const result = await runQuery(query)
        return result
    }

    async getHostIds(clubId: string) {
        const query = `select "hostIds" from clubs where id = ${Utility.esc(
            clubId
        )}`
        const result = await runQuery(query)
        return result
    }

    async addFee(fee: Types.Fee) {
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
        const insertValue = Utility.escapeObject(dict)
        query = query.replace("%1", insertValue.key)
        query = query.replace("%2", insertValue.value)
        const result = await runQuery(query)
        return result
    }

    async getFee(tierId: string) {
        const query = `select * from "clubFees" where id = ${Utility.esc(
            tierId
        )}`
        const result = await runQuery(query)
        return result
    }

    async getFeesOfClub(clubId: string) {
        const query = `select * from "clubFees" where "clubId" = ${Utility.esc(
            clubId
        )}`
        const result = await runQuery(query)
        return result
    }

    async saveEnrollment(data: Types.EnrollOutput, userId: string) {
        const params: any = {
            errorMessage: data.error,
            feeId: data.fee.id,
            id: data.enrollId,
            cardId: data.cardId,
            createdAt: data.createdAt,
            userId: userId
        }
        let query = `insert into "enrollment" (%1) values (%2)`
        const insertValue = Utility.escapeObject(params)
        query = query.replace("%1", insertValue.key)
        query = query.replace("%2", insertValue.value)
        const result = await runQuery(query)
        return result
    }

    async setFavorite(clubId: string, userId: string) {
        const checkFavoriteQuery = `select count("userId") in "favoriteClubs  where "userId" = ${Utility.esc(
            userId
        )} and "clubId" = ${Utility.esc(clubId)}"`
        const result = await runQuery(checkFavoriteQuery)
        if (result.count === 0) {
            const params: any = {
                clubId: clubId,
                userId: userId
            }
            const insertValue = Utility.escapeObject(params)
            let query = `insert into "favoriteClubs" (%1) values (%2)`
            query = query.replace("%1", insertValue.key)
            query = query.replace("%2", insertValue.value)
            runQuery(query)
            return true
        } else {
            const query = `delete from "favoriteClubs" where "userId" = ${Utility.esc(
                userId
            )} and "clubId" = ${Utility.esc(clubId)}`
            runQuery(query)
            return false
        }
    }
}
