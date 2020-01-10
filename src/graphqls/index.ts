export let typeDefs: any[] = [
`
type Query {
  hello: String
}
   
type Mutation {
  hello(message: String) : String
}
`
]

export let resolvers: any[] = [
    {
        Query: {
            hello: () => "Hello"
        }
    }
]

import configUser from "../users"
configUser(typeDefs, resolvers)

import configEvent from "../events"
configEvent(typeDefs, resolvers)
