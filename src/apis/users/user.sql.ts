import MUser from "./user"
import { runQuery } from "../../db/connection"
import bcrypt from "bcrypt"

export default class UserSQL {
    async register(user: MUser) {
        const query = `
        insert into users 
        (id, email, password, name, token)
        values 
        ('${user.id}', '${user.email}', '${user.password}', '${user.name}', '${user.token}')
        `
        const result = await runQuery(query)
        console.log(result)
        return user
    }

    async login(email: string, password: string) {
        const query = `
        select * from users where email = '${email}'
        `
        const result = await runQuery(query)
        console.log(result)

        if (result.rows.count > 1) {
            console.log("Found 2 accounts with same email")
            throw Error("Server error.")
        } else if (result.count == 0) {
            throw Error("Incorrect credentials")
        } else {
            const raw = result.rows[0]
            const userPassword = raw.password
            const isMatch = bcrypt.compareSync(password, userPassword)
            if (isMatch == false ) {
                throw Error("Incorrect credentials")
            }
            const newUser = new MUser(raw)
            return newUser
        }
    }

    async checkEmailExist(email) {
        const query = `select COUNT(email) > 0 exist from users where email = '${email}'`
        const result = await runQuery(query)
        return result.rows[0].exist
    }
}
