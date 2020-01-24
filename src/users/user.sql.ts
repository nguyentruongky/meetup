import * as Types from "../resolvers-types"
import { runQuery } from "../db/connection"
import bcrypt from "bcrypt"
import * as Builder from "../utils/builder"
import * as Utility from "../utils/utils"

export const register = async (user: Types.MUser) => {
    const query = `
        insert into users 
        (id, email, password, name, token)
        values 
        ('${user.id}', 
        ${Utility.esc(user.email)}, 
        '${user.password}', 
        ${Utility.esc(user.name)}, 
        '${user.token}')
        `
    const result = await runQuery(query)
    return user
}

export const login = async (email: string, password: string) => {
    const query = `
        select * from users where email = ${Utility.esc(email)}
        `
    const result = await runQuery(query)
    return result
}

export const checkEmailExist = async (email: string) => {
    const query = `select COUNT(email) > 0 exist from users where email = ${Utility.esc(
        email
    )}`
    const result = await runQuery(query)
    return result.rows[0].exist
}

export const getUserByToken = async (token: string) => {
    const query = `
        select * from users where token = ${Utility.esc(token)}
        `
    const result = await runQuery(query)

    const rowCount = result.rows.length
    if (rowCount > 1) {
        return null
    } else if (rowCount == 0) {
        return null
    } else {
        const raw = result.rows[0]
        const newUser = Builder.User.MUserBuilder.create(raw)
        return newUser
    }
}

export const updateStripeUserId = async (
    userId: string,
    stripeUserId: String
) => {
    const query = `
        update users set "stripeUserId"=${Utility.esc(
            stripeUserId
        )} where id = ${Utility.esc(userId)}
        `
    runQuery(query)
}

export const getJoinedClubs = async (userId: string) => {
    const query = `select * from "usersClubs", "clubs" where "userId" = ${Utility.esc(
        userId
    )} and "clubId" = "clubs".id`
    const result = await runQuery(query)
    return result
}

export const patchUser = async (userId: string, values: any) => {
    Utility.clean(values)
    let updateValues: string[] = []
    for (const key in values) {
        const element = values[key]
        updateValues.push(`${key} = ${Utility.esc(element)}`)
    }
    if (updateValues.length == 0) {
        return
    }
    const updateString = updateValues.join(", ")

    let query = `update users set ${updateString} where "id" = ${Utility.esc(
        userId
    )}`
    await runQuery(query)

    query = `select * from users where id = ${Utility.esc(userId)}`
    const newResult = await runQuery(query)
    const user = Builder.User.MUserBuilder.create(newResult.rows[0])
    return user
}
export const getUserByEmail = async (email: string) => {
    const query = `
        select * from users where email = ${Utility.esc(email)}
        `
    const result = await runQuery(query)

    const rowCount = result.rows.length
    if (rowCount > 1) {
        return null
    } else if (rowCount == 0) {
        return null
    } else {
        const raw = result.rows[0]
        const newUser = Builder.User.MUserBuilder.create(raw)
        return newUser
    }
}

export const saveOTP = (userId: string, email: string, code: string) => {
    const dict: any = {
        userId: userId,
        email,
        code: code,
        expiredAt: Date.now() + 5*60*1000
    }
    let query = `insert into "OTP" (%1) values (%2)`
    const insertValue = Utility.escapeObject(dict)
    query = query.replace("%1", insertValue.key)
    query = query.replace("%2", insertValue.value)

    runQuery(query)
}

export const getOTP = async (code: string, email: string) => {
    const query = `select * from "OTP" where code = ${Utility.esc(code)} and email = ${Utility.esc(email)}`
    const result = await runQuery(query)
    return result
}

export const deleteOTP = (code: string, email: string) => {
    const query = `delete from "OTP" where code = ${Utility.esc(code)} and email = ${Utility.esc(email)}`
    runQuery(query)
}

export const updatePassword = async (userId: string, newPassword: string) => {
    const query = `update users set password = '${newPassword}' where id = ${Utility.esc(userId)}`
    const result = await runQuery(query)
    return result
}
