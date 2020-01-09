import { typeDefs } from "./user.graphql"
import {userMutation} from "./user.functions"

const resolvers = {
    Query: {
        sayHello: () => {
            return "Saying hello"
        }
    },

    Mutation: userMutation
}

export default {
    typeDefs,
    resolvers
}
