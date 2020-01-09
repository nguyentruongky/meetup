const { Client } = require("pg")

export const runQuery = async (queryString: string) => {
    const client = new Client({
        database: "meetup"
    })
    client.connect()
    const res = await client.query(queryString)
    return res
}
