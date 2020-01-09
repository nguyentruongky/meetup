import MUser from "./user"
import bcrypt from "bcrypt"
import { runQuery } from "../db/connection"

export default class UserSQL {
    async register(user: MUser) {
        const pw = bcrypt.hashSync(user.password, 10)
        const createdAt = new Date().getTime()
        const token = user.generateToken()
        const query = `
        insert into users 
        (id, email, password, name, token, createdAt)
        values 
        ('${user.id}', '${user.email}', '${pw}', '${user.name}', '${token}', ${createdAt})
        `
        const result = await runQuery(query)
        console.log(result)
        const newUser = new MUser(result)
        return newUser
    }
}
