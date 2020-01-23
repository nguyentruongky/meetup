import * as Types from "../resolvers-types"
import * as SQL from "../utils/sql"
import * as Builder from "../utils/builder"
import StripeHelper from "../utils/stripeHelper"
import * as MError from "../utils/MError"

export const queries: Types.QueryResolvers = {
    cards: (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw MError.Unauthorized
        }
        const stripeUserId = user.stripeUserId
        const striper = new StripeHelper()
        return striper.cardList(stripeUserId)
    },

    me: async (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw MError.Unauthorized
        }
        delete user.password

        const stripeUserId = user.stripeUserId
        if (stripeUserId) {
            const striper = new StripeHelper()
            const cards = await striper.cardList(stripeUserId)
            user.cards = cards
        } else {
            user.cards = []
        }

        const clubs = await SQL.User.getJoinedClubs(user.id)
        user.clubs = clubs.rows
        return user
    }
}
