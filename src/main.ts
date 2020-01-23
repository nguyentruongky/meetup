import { ApolloServer } from "apollo-server"

import { mainResolvers as resolvers } from "./resolvers/index"
import { schema } from "../schema"

import UserSQL from "./users/user.sql"
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

        const sql = new UserSQL()
        const user = await sql.getUserByToken(token)
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
