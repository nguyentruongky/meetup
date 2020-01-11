import { typeDefs } from "./user.graphql"
import { mutations } from "./user.mutations"

export const resolvers = {
    Query: {
        sayHello: () => {
            return "Saying hello"
        }
    },

    Mutation: mutations
}
