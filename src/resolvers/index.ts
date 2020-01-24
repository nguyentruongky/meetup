export let mainResolvers: any[] = []

const fs = require("fs")
const path = __dirname + "/.."
var getFiles = function(path: string) {
    fs.readdirSync(path).forEach(function(file: string) {
        var subpath = path + "/" + file
        if (fs.lstatSync(subpath).isDirectory()) {
            getFiles(subpath)
        } else {
            if (
                file.includes("mutations") == true &&
                file.includes("map") == false
            ) {
                const { mutations } = require(path + "/" + file)
                if (mutations !== undefined) {
                    mainResolvers.push({
                        Mutation: mutations
                    })
                }
            }

            if (
                file.includes("queries") == true &&
                file.includes("map") == false
            ) {
                const { queries } = require(path + "/" + file)
                if (queries !== undefined) {
                    mainResolvers.push({
                        Query: queries
                    })
                }
            }
        }
    })
}
getFiles(path)
