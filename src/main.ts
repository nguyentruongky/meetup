import { ApolloServer } from "apollo-server"
import ProductService from "./product/productService";

let typeDefs: any = [`
  type Query {
    hello: String
  }
     
  type Mutation {
    hello(message: String) : String
  }
`];

let resolvers = {
    Query: {
        hello: () => "Hello"
    },
    Mutation: {
        hello: (_: any, helloData: any) => {
            const helloMessage = "This is a message to " + helloData.message
            return helloMessage
        }
    }
}

const productService = new ProductService()
typeDefs += productService.syntax
productService.configResolvers(resolvers)

const server = new ApolloServer({ 
    resolvers, 
    typeDefs, 
    introspection: true, 
    playground: true
})

server.listen(3000)
    .then(
        ({ url }) => console.log(`Server ready at ${url}`)
    )

