import { ApolloServer, GraphQLOptions } from "apollo-server"
import { mainTypeDefs as typeDefs, mainResolvers as resolvers } from "./graphqls/index"
import UserSQL from "./users/user.sql"
import MUser from "./users/user"
import "./models"

const server = new ApolloServer({
    resolvers: resolvers,
    typeDefs: typeDefs,
    context: async ({ req }) => {
        const reqContext: any = {}
        const token = req.headers.authorization
        if (token === undefined) {
            return reqContext
        }

        const sql = new UserSQL()
        const result = await sql.getUserByToken(token)
        reqContext.user = result
        return reqContext
    },
    introspection: true,
    playground: true
})

server.listen(3000).then(({ url }) => console.log(`Server ready at ${url}`))
