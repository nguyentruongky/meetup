import {MUser} from "../resolvers-types"
import UserSQL from "./user.sql"
import bcrypt from "bcrypt"
import { MUserBuilder } from "../utils/builder"
const saltRound = 10
import { MutationResolvers } from "resolvers-types"

export const mutations: MutationResolvers = {
    async register(root, args, ctx) {
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
        return savedUser
    },
    login(root, args, ctx) {
        const email = args.email
        const password = args.password

        const userSQL = new UserSQL()
        return userSQL.login(email, password)
    }
}
