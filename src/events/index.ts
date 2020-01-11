import { typeDefs } from "./event.graphql"
import { mutations } from "./event.mutations"
import { queries } from "./event.queries"

export const resolvers = {
    Query: queries,
    Mutation: mutations
}