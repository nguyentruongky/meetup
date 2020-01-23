const { Client } = require("pg")

export const runQuery = async (queryString: string) => {
    console.log("running query: \n" + queryString)

    const client = new Client({
        database: "meetup",
        user: "postgres",
        password: "rhadl1"
    })
    client.connect()
    const res = await client.query(queryString)
    return res
}
