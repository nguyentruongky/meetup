import * as Types from "../resolvers-types"
import UserSQL from "./user.sql"
import * as Builder from "../utils/builder"
import Striper from "../utils/striper"
import { MErrorType } from "../utils/MError"

export const queries: Types.QueryResolvers = {
    cards: (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw new Error(MErrorType.UNAUTHORIZED)
        }
        const stripeUserId = user.stripeUserId
        const striper = new Striper()
        return striper.cardList(stripeUserId)
    },

    me: async (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw new Error(MErrorType.UNAUTHORIZED)
        }
        delete user.password

        const stripeUserId = user.stripeUserId
        if (stripeUserId) {
            const striper = new Striper()
            const cards = await striper.cardList(stripeUserId)
            user.cards = cards
        } else {
            user.cards = []
        }

        const sql = new UserSQL()
        const clubs = await sql.getJoinedClubs(user.id)
        user.clubs = clubs.rows
        return user
    }
}
