import UserSQL from "./user.sql"
import bcrypt from "bcrypt"
const saltRound = 10
import Striper from "../utils/striper"
import * as Types from "../resolvers-types"
import * as Builder from "../utils/builder"
import * as MError from "../utils/MError"

export const mutations: Types.MutationResolvers = {
    register: async (root, args, ctx) => {
        const userSQL = new UserSQL()

        const email = args.email
        const exist = await userSQL.checkEmailExist(email)

        if (exist) {
            throw new Error(MError.Type.EMAIL_EXIST)
        }

        const user = Builder.User.MUserBuilder.create(args)
        const pw = bcrypt.hashSync(user.password, saltRound)
        user.password = pw
        user.createdAt = new Date().getTime()
        user.token = Builder.User.MUserBuilder.generateToken(user.id)
        const savedUser = await userSQL.register(user)
        delete savedUser.password

        const striper = new Striper()
        striper.createCustomer(email, user.name).then(stripeUserId => {
            userSQL.updateStripeUserId(savedUser.id, stripeUserId)
        })

        return savedUser
    },
    login: async (root, args, ctx) => {
        const email = args.email
        const password = args.password

        const userSQL = new UserSQL()
        const result = await userSQL.login(email, password)
        const rowCount = result.rows.length
        if (rowCount > 1) {
            console.log("Found 2 accounts with same email")
            throw new Error(MError.Type.INTERNAL_SERVER_ERROR)
        } else if (rowCount == 0) {
            throw new Error(MError.Type.UNAUTHORIZED)
        } else {
            const raw = result.rows[0]
            const userPassword = raw.password
            const isMatch = bcrypt.compareSync(password, userPassword)
            if (isMatch == false) {
                throw new Error(MError.Type.UNAUTHORIZED)
            }
            const newUser = Builder.User.MUserBuilder.create(raw)
            return newUser
        }
        return
    },
    addCard: async (root, args, ctx) => {
        const user: Types.MUser = ctx.user
        if (user == undefined) {
            throw new Error(MError.Type.UNAUTHORIZED)
        }

        let stripeUserId = user.stripeUserId
        if (stripeUserId === null) {
            stripeUserId = await createStripeAccountIfNeeded(
                user.id,
                user.name,
                user.email
            )
        }

        const striper = new Striper()
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
            throw new Error(MError.Type.UNAUTHORIZED)
        }

        const striper = new Striper()
        const cardId = await striper.addCardByToken(
            user.stripeUserId,
            args.token
        )
        return cardId
    }
}

async function createStripeAccountIfNeeded(
    id: string,
    name: string,
    email: string
): Promise<string> {
    const striper = new Striper()
    return striper.createCustomer(email, name).then(stripeUserId => {
        const userSQL = new UserSQL()
        userSQL.updateStripeUserId(id, stripeUserId)
        return stripeUserId
    })
}
