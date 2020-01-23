import { ApolloServer } from "apollo-server"

import { mainResolvers as resolvers } from "./resolvers/index"
import { schema } from "../schema"
import * as SQL from "./utils/SQL"
import MContext from "./models/mcontext"

import { formatError } from "./utils/MError"
const errorName = formatError.errorName

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization
        if (token === undefined) {
            return undefined
        }
        const user = await SQL.User.getUserByToken(token)
        const ctx: MContext = {
            token,
            user,
            error: errorName
        }
        return ctx
    },
    formatError: err => {
        return formatError.getError(err)
    },
    introspection: true,
    playground: true
})

server.listen(4000).then(({ url }) => console.log(`Server ready at ${url}`))
