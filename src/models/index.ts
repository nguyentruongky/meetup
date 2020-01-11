const testFolder = __dirname
import fs from "fs"

let allTypeDefs = ""
fs.readdirSync(testFolder).forEach(file => {
    if (file.includes("graphql") == true && file.includes("map") == false) {
        const { typeDefs } = require(`./${file}`)
        allTypeDefs += typeDefs
    }
})

export const typeDefs = allTypeDefs