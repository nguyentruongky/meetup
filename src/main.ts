import { ApolloServer, GraphQLOptions } from "apollo-server"
import { makeExecutableSchema } from "graphql-tools"
import { applyMiddleware } from "graphql-middleware"

import { mainResolvers as resolvers } from "./resolvers/index"
import { schema } from "../schema"

import UserSQL from "./users/user.sql"
import middlewares from "./middlewares"

console.log(resolvers)

// const schema1 = makeExecutableSchema({ schema, resolvers })
// const schemaWithMiddleware = applyMiddleware(schema, ...middlewares)

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
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

server.listen(4000).then(({ url }) => console.log(`Server ready at ${url}`))
