import { typeDefs } from "./user.graphql"
import { register } from "./user.functions"
import MUser from "./user"

const resolvers = {
    Query: {
        sayHello: () => {
            return "Saying hello"
        }
    },

    Mutation: {
        register
    }
}

export default {
    typeDefs,
    resolvers
}
