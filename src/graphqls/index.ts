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
import configEvent from "../events"
[
  configUser, 
  configEvent
].forEach(execute => {
    execute(typeDefs, resolvers)
})
