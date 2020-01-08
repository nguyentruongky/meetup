import { typeDefs } from "./user.ql"
import { register } from "./user.functions"
import { MUser } from "./user"

const resolvers = {
    Query: {
        sayHello: () => {
            return "Saying hello"
        }
    },

    Mutation: {
        register: (_: any) => {
            return new MUser("Ky", "avatar", "intro")
        }
    }
}

export default {
    typeDefs,
    resolvers
}
