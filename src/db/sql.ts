import { runQuery } from "../db/connection"

export default class PSQL {
    async checkEmail(email) {
        const query = `select COUNT(email) > 0 exist from users where email = '${email}'`
        const result = await runQuery(query)
        return result.exist
    }
}
