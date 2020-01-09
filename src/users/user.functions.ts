import MUser from "./user"
import UserSQL from "./user.sql"
import SQL from "../db/sql"
import bcrypt from "bcrypt"
const saltRound = 10

export const userMutation = {
    register: async (_: any, raw: any) => {
        const email = raw.email
        const sql = new SQL()
        const exist = await sql.checkEmail(email)
    
        if (exist) {
            throw Error("Email exists... ❌❌❌")
            return
        }
    
        const user = new MUser(raw)
        const userSQL = new UserSQL()
        const pw = bcrypt.hashSync(user.password, saltRound)
        user.password = pw
        user.createdAt = new Date().getTime()
        user.token = user.generateToken()
        const savedUser = await userSQL.register(user)
        return savedUser
    },
    login: async (_: any, raw: any) => { 
        const email = raw.email
        const password = raw.password
        
        const userSQL = new UserSQL()
        const result = await userSQL.login(email, password)
        return result
    }
}