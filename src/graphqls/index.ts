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

import user from "../users/index"
typeDefs.push(user.typeDefs)
resolvers.push(user.resolvers)
