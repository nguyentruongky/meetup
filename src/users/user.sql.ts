import MUser from "./user"
import { runQuery } from "../db/connection"

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
        const newUser = new MUser(result)
        return newUser
    }
}
