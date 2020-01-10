import { typeDefs } from "./user.graphql"
import { mutations } from "./user.mutations"

const resolvers = {
    Query: {
        sayHello: () => {
            return "Saying hello"
        }
    },

    Mutation: mutations
}

export default {
    typeDefs,
    resolvers
}
