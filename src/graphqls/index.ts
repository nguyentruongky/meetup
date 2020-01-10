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

import user from "../apis/users"
typeDefs.push(user.typeDefs)
resolvers.push(user.resolvers)

import events from "../apis/events"
typeDefs.push(events.typeDefs)
resolvers.push(events.resolvers)