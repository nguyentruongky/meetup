import MUser from "./user"
import UserSQL from "./user.sql"
import SQL from "../db/sql"


export const register = async (_: any, raw: any) => {
    const email = raw.email
    const sql = new SQL()
    const exist = await sql.checkEmail(email)

    if (exist) {
        return "Email existed."
    }

    const newUser = new MUser(raw)
    const userSQL = new UserSQL()
    const savedUser = await userSQL.register(newUser)
    return savedUser
}
