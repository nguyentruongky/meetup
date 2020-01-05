export const ql = `
type Product {
    name: String,
    description: String,
    id: String,
    price: Float
}

extend type Query {
    getProduct(id: String!): Product
}

extend type Mutation {
    product(name:String, description: String, price: Float): Product!
}
`