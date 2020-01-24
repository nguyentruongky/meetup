const { Client } = require("pg")
import { config } from "./configuration"

export const runQuery = async (queryString: string) => {
    // console.log("running query: \n" + queryString)
    const client = new Client(config)
    client.connect()
    const res = await client.query(queryString)
    return res
}
