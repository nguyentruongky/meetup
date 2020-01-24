import * as SQL from "../utils/sql"
import * as Builder from "../utils/builder"
import * as Types from "../resolvers-types"

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
    club: (root, args, ctx) => {
        const eventId = args.id
        return SQL.Club.getClub(eventId).then(result => {
            const clubsRaw: any[] = result.rows
            const groupClubs: any = {}

            const _clubs = clubsRaw.map(raw => {
                return Builder.Club.MClubBuilder.create(raw)
            })
            _clubs.forEach(item => {
                groupClubs[item.id] = item
            })
            const clubs: Types.MClub[] = Object.values(groupClubs)
            if (clubs.length > 0) {
                return clubs[0]
            } else {
                return null
            }
        })
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
