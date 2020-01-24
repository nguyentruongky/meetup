export let types: any[] = []

const path = __dirname
const fs = require("fs")

fs.readdirSync(path).forEach(file => {
    if (file.includes("schema") == true && file.includes("map") == false) {
        const { schema } = require(path + "/" + file)
        if (schema) {
            types.push(schema)
        }
    }
})
