import { ApolloServer, GraphQLOptions } from "apollo-server"
import { makeExecutableSchema } from "graphql-tools"
import { applyMiddleware } from "graphql-middleware"

import {
    mainTypeDefs as typeDefs,
    mainResolvers as resolvers
} from "./graphqls/index"
import UserSQL from "./users/user.sql"
import middlewares from "./middlewares"

const schema = makeExecutableSchema({ typeDefs, resolvers })
const schemaWithMiddleware = applyMiddleware(schema, ...middlewares)

const server = new ApolloServer({
    schema: schemaWithMiddleware,
    context: async ({ req }) => {
        const ctx: any = {}
        const token = req.headers.authorization
        if (token === undefined) {
            return ctx
        }

        const sql = new UserSQL()
        const result = await sql.getUserByToken(token)
        ctx.user = result
        return ctx
    },
    introspection: true,
    playground: true
})

server.listen(3000).then(({ url }) => console.log(`Server ready at ${url}`))
