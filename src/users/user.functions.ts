import MUser from "./user"
import UserSQL from "./user.sql"
import SQL from "../db/sql"
import bcrypt from "bcrypt"

export const register = async (_: any, raw: any) => {
    const email = raw.email
    const sql = new SQL()
    const exist = await sql.checkEmail(email)

    if (exist) {
        return "Email existed."
    }

    const user = new MUser(raw)
    const userSQL = new UserSQL()
    const pw = bcrypt.hashSync(user.password, 10)
    user.password = pw
    user.createdAt = new Date().getTime()
    user.token = user.generateToken()
    const savedUser = await userSQL.register(user)
    return savedUser
}
