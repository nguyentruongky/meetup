import { ApolloServer } from "apollo-server"

import { mainResolvers as resolvers } from "./resolvers/index"
import { schema } from "../schema"
import * as SQL from "./utils/sql"
import * as Models from "./utils/models"

import { formatError } from "./utils/MError"
const errorNames = formatError.errorName

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization
        if (token === undefined) {
            return undefined
        }
        const user = await SQL.User.getUserByToken(token)
        const ctx: Models.MContext = {
            token,
            user,
            error: errorNames
        }
        return ctx
    },
    formatError: err => {
        const error = formatError.getError(err)
        const name = err.extensions.exception.name
        if (name) {
            const newError: any = {}
            newError.message = name
            newError.statusCode = error.statusCode
            return newError
        }
        return error
    },
    introspection: true,
    playground: true
})

server.listen(4000).then(({ url }) => console.log(`Server ready at ${url}`))
