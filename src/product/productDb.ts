import { Product } from "./product"
import { runQuery } from "../db/connection"

export const getProduct = async (id: string) => {
    const queryString = `SELECT * FROM "products" WHERE "id" = '9b845491-074e-4fdd-824d-971066fb39ed'`
    const result = await runQuery(queryString)
    const rows: any[] = result.rows
    if (rows.length > 0) {
        return rows[0]
    } else {
        return null
    }
}

