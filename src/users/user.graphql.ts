export const typeDefs = `
type MUser {
    id: String,
    name: String,
    email: String,
    password: String,
    token: String,
    avatar: String,
    introduction: String,
    createdAt: Float
}

extend type Query {
    sayHello: String
}

extend type Mutation {
    register(email: String!, password: String!, name: String!): MUser!
}
`
