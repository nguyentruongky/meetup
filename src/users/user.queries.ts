import * as Types from "../resolvers-types"
import * as SQL from "../utils/sql"
import StripeHelper from "../utils/stripeHelper"
import * as MError from "../utils/MError"
import * as Builder from "../utils/builder"

export const queries: Types.QueryResolvers = {
    cards: (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw MError.Unauthorized
        }
        return getCards(user)
    },

    me: async (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw MError.Unauthorized
        }
        return getMe(user)
    }
}

export async function getMe(user: Types.MUser): Promise<Types.MUser> {
    const cards = await getCards(user)
    user.cards = cards

    const clubs = await SQL.User.getJoinedClubs(user.id)
    user.clubs = clubs.rows
    return Builder.User.MUserBuilder.create(user)
}

async function getCards(user: Types.MUser): Promise<Types.Card[]> {
    const stripeUserId = user.stripeUserId
    const striper = new StripeHelper()
    if (stripeUserId) {
        return striper.cardList(stripeUserId)
    } else {
        const stripeUserId = await striper.createCustomer(user.email, user.name)
        SQL.User.updateStripeUserId(user.id, stripeUserId)
        return []
    }
}
