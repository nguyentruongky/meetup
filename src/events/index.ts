import { typeDefs } from "./event.graphql"
import { mutations } from "./event.mutations"
import { queries } from "./event.queries"

const resolvers = {
    Query: queries,
    Mutation: mutations
}

export default function setup(mainTypeDefs: any[], mainResolvers: any[]) {
    mainTypeDefs.push(typeDefs)
    mainResolvers.push(resolvers)
}