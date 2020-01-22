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

    me: (root, args, ctx) => { 
        const user: MUser = ctx.user
        if (user == undefined) {
            throw new Error("Invalid token")
        }
        delete user.password
        return user
    }
}