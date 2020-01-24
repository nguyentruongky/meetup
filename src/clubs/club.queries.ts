import * as SQL from "../utils/sql"
import * as Builder from "../utils/builder"
import * as Types from "../resolvers-types"
import * as MError from "../utils/MError"

export const queries: Types.QueryResolvers = {
    clubs: async (root, args, ctx) => {
        const clubsRaw: any[] = (await SQL.Club.getClubs()).rows
        let clubsDict = {}
        clubsRaw.forEach(item => {
            clubsDict[item.id] = Builder.Club.MClubBuilder.create(item)
        })

        const feesRaw = (await SQL.Club.getFees()).rows
        feesRaw.forEach(item => {
            if (item.id) {
                clubsDict[
                    item.clubId
                ].fee = Builder.Club.FeeBuilder.createFromSQL(item)
            }
        })
        const clubs: Types.MClub[] = Object.values(clubsDict)
        return clubs
    },
    club: async (root, args, ctx) => {
        const clubId = args.id
        const clubsRaw: any[] = (await SQL.Club.getClub(clubId)).rows
        if (clubsRaw.length == 0) { 
            throw MError.NotFound
        } else if (clubsRaw.length > 1) {
            throw MError.Internal
        } 
        const club: Types.MClub = clubsRaw[0]

        const feeRaw = (await SQL.Club.getFeeByClubId(clubId)).rows
        if (feeRaw.length > 0) {
            club.fee = Builder.Club.FeeBuilder.createFromSQL(feeRaw[0])
        }
        return club
    },
    search: (root, args, ctx) => {
        const keyword = args.keyword
        return SQL.Club.searchByKeyword(keyword).then(result => {
            const eventsRaw: any[] = result.rows
            const events = eventsRaw.map(raw => {
                return Builder.Club.MClubBuilder.create(raw)
            })
            return events
        })
    }
}
