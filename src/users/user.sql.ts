import { MUser } from "../resolvers-types"
import { runQuery } from "../db/connection"
import bcrypt from "bcrypt"
import { MUserBuilder } from "../utils/builder"
import { esc } from "../utils/utils"

export default class UserSQL {
    async register(user: MUser) {
        const query = `
        insert into users 
        (id, email, password, name, token)
        values 
        ('${user.id}', 
        ${esc(user.email)}, 
        '${user.password}', 
        ${esc(user.name)}, 
        '${user.token}')
        `
        const result = await runQuery(query)
        return user
    }

    async login(email: string, password: string) {
        const query = `
        select * from users where email = ${esc(email)}
        `
        const result = await runQuery(query)
        return result
    }

    async checkEmailExist(email: string) {
        const query = `select COUNT(email) > 0 exist from users where email = ${esc(
            email
        )}`
        const result = await runQuery(query)
        return result.rows[0].exist
    }

    async getUserByToken(token: string) {
        const query = `
        select * from users where token = ${esc(token)}
        `
        const result = await runQuery(query)

        const rowCount = result.rows.length
        if (rowCount > 1) {
            return null
        } else if (rowCount == 0) {
            return null
        } else {
            const raw = result.rows[0]
            const newUser = MUserBuilder.create(raw)
            return newUser
        }
    }

    async updateStripeUserId(userId: string, stripeUserId: String) {
        const query = `
        update users set "stripeUserId"=${esc(stripeUserId)} where id = ${esc(
            userId
        )}
        `
        runQuery(query)
    }

    async getJoinedClubs(userId: string) {
        const query = `select * from "usersClubs", "clubs" where "userId" = ${esc(
            userId
        )} and "clubId" = "clubs".id`
        const result = await runQuery(query)
        return result
    }
}
