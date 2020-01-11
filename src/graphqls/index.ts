export let mainResolvers: any[] = []
export let mainTypeDefs: any[] = [
    `
type Query {
  hello: String
}
   
type Mutation {
  hello(message: String) : String
}
`
]

const fs = require("fs")
const path = __dirname + "/.."
var getFiles = function(path: string) {
    fs.readdirSync(path).forEach(function(file: string) {
        var subpath = path + "/" + file
        if (fs.lstatSync(subpath).isDirectory()) {
            getFiles(subpath)
        } else {
            if (
                file.includes("graphql") == true &&
                file.includes("map") == false
            ) {
                const { typeDefs } = require(path + "/" + file)
                mainTypeDefs.push(typeDefs)
            }

            if (
                file.includes("mutations") == true &&
                file.includes("map") == false
            ) {
                const {mutations} = require(path + "/" + file)
                if (resolvers !== undefined) {
                    mainResolvers.push(resolvers)
                }
            }
        }
    })
}
getFiles(path)
console.log(mainResolvers)

