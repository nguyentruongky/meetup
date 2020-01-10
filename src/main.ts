import { ApolloServer, GraphQLOptions } from "apollo-server"
import { typeDefs, resolvers } from "./graphqls/index"

const server = new ApolloServer({
    resolvers: resolvers,
    typeDefs: typeDefs,
    context: ({req}) => {
        const context: any = {}
        context.userId = "123"
        return context
    },
    introspection: true,
    playground: true
})

server.listen(3000).then(({ url }) => console.log(`Server ready at ${url}`))
