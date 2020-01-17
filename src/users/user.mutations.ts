import UserSQL from "./user.sql"
import bcrypt from "bcrypt"
import { MUserBuilder } from "../utils/builder"
const saltRound = 10
import Striper from "../utils/striper"
import { MutationResolvers } from "resolvers-types"

export const mutations: MutationResolvers = {
    register: async (root, args, ctx) => {
        const userSQL = new UserSQL()

        const email = args.email
        const exist = await userSQL.checkEmailExist(email)

        if (exist) {
            throw Error("Email exists... ❌❌❌")
        }

        const user = MUserBuilder.create(args)
        const pw = bcrypt.hashSync(user.password, saltRound)
        user.password = pw
        user.createdAt = new Date().getTime()
        user.token = MUserBuilder.generateToken(user.id)
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
        return userSQL.login(email, password)
    }
}
