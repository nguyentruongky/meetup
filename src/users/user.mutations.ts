import {MUser} from "../resolvers-types"
import UserSQL from "./user.sql"
import bcrypt from "bcrypt"
import { MUserBuilder } from "../utils/builder"
const saltRound = 10

export const mutations = {
    async register(_: any, raw: any) {
        const userSQL = new UserSQL()

        const email = raw.email
        const exist = await userSQL.checkEmailExist(email)

        if (exist) {
            throw Error("Email exists... ❌❌❌")
            return
        }

        const user = MUserBuilder.create(raw)
        const pw = bcrypt.hashSync(user.password, saltRound)
        user.password = pw
        user.createdAt = new Date().getTime()
        user.token = MUserBuilder.generateToken(user.id)
        const savedUser = await userSQL.register(user)
        delete savedUser.password
        return savedUser
    },
    login(_: any, raw: any) {
        const email = raw.email
        const password = raw.password

        const userSQL = new UserSQL()
        return userSQL.login(email, password)
    }
}
