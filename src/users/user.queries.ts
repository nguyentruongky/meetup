import { MClub, Card, MUser, QueryResolvers } from "../resolvers-types"
import UserSQL from "./user.sql"
import { MClubBuilder } from "../utils/builder"
import Striper from "../utils/striper"

export const queries: QueryResolvers = {
    cards: (root, args, ctx) => {
        const user: MUser = ctx.user
        if (user == undefined) {
            throw new Error("You have to login")
        }
        const stripeUserId = user.stripeUserId
        const striper = new Striper()
        return striper.cardList(stripeUserId)
    },

    me: async (root, args, ctx) => { 
        const user: MUser = ctx.user
        if (user == undefined) {
            throw new Error("Invalid token")
        }
        delete user.password

        const stripeUserId = user.stripeUserId
        const striper = new Striper()
        const cards = await striper.cardList(stripeUserId)        
        user.cards = cards

        const sql = new UserSQL()
        const clubs = await sql.getJoinedClubs(user.id)
        user.clubs = clubs.rows
        return user
    }
}