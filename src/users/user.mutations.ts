import * as SQL from "../utils/sql"
import bcrypt from "bcrypt"
const saltRound = 10
import StripeHelper from "../utils/stripeHelper"
import * as Types from "../resolvers-types"
import * as Builder from "../utils/builder"
import * as MError from "../utils/MError"
import { getMe } from "./user.queries"

export const mutations: Types.MutationResolvers = {
    register: async (root, args, ctx) => {
        const email = args.email
        const exist = await SQL.User.checkEmailExist(email)

        if (exist) {
            throw MError.EmailExists
        }

        const user = Builder.User.MUserBuilder.create(args)
        const pw = bcrypt.hashSync(user.password, saltRound)
        user.password = pw
        user.createdAt = new Date().getTime()
        user.token = Builder.User.MUserBuilder.generateToken(user.id)
        const savedUser = await SQL.User.register(user)
        delete savedUser.password

        const striper = new StripeHelper()
        striper.createCustomer(email, user.name).then(stripeUserId => {
            SQL.User.updateStripeUserId(savedUser.id, stripeUserId)
        })

        return savedUser
    },
    login: async (root, args, ctx) => {
        const email = args.email
        const password = args.password

        const result = await SQL.User.login(email, password)
        const rowCount = result.rows.length
        if (rowCount > 1) {
            console.log("Found 2 accounts with same email")
            throw MError.Internal
        } else if (rowCount == 0) {
            throw MError.Unauthorized
        } else {
            const raw = result.rows[0]
            const userPassword = raw.password
            const isMatch = bcrypt.compareSync(password, userPassword)
            if (isMatch == false) {
                throw MError.Unauthorized
            }
            const newUser = Builder.User.MUserBuilder.create(raw)
            return newUser
        }
        return
    },
    addCard: async (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw MError.Unauthorized
        }

        let stripeUserId = user.stripeUserId
        if (!stripeUserId) {
            stripeUserId = await createStripeAccountIfNeeded(
                user.id,
                user.name,
                user.email
            )
        }

        const striper = new StripeHelper()
        const cardId = await striper.addCard(
            stripeUserId,
            args.number,
            args.expMonth,
            args.expYear,
            args.cvc
        )
        return cardId
    },
    addCardByToken: async (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw MError.Unauthorized
        }

        const striper = new StripeHelper()
        if (!user.stripeUserId) {
            const stripeUserId = await createStripeAccountIfNeeded(
                user.id,
                user.name,
                user.email
            )
            user.stripeUserId = stripeUserId
        }
        const cardId = await striper.addCardByToken(
            user.stripeUserId,
            args.token
        )
        return cardId
    },
    patchUser: async (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw MError.Unauthorized
        }
        let newValues = args.input
        const updatedUser = await SQL.User.patchUser(user.id, newValues)
        return getMe(updatedUser)
    }
}

async function createStripeAccountIfNeeded(
    id: string,
    name: string,
    email: string
): Promise<string> {
    const striper = new StripeHelper()
    const stripeUserId = await striper.createCustomer(email, name)
    SQL.User.updateStripeUserId(id, stripeUserId)
    return stripeUserId
}
