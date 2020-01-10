export const typeDefs = `
type MEvent {
    id: String!
    title: String!
    host: MUser!
    description: String!
    attendees: [MUser]
    startAt: Float!
    duration: Int!
    address: String!
    lat: Float!
    long: Float!
    locationNotes: String
    slotCount: Int
    createdAt: Float
}

extend type Query {
    getEvents: [MEvent!]
    getEvent(id: String!): MEvent
}

extend type Mutation {
    createEvent(title: String!, description: String!, startAt: Float!, duration: Int!, address: String!, lat: Float!, long: Float!, locationNotes: String, slotCount: Int): MEvent!
}
`
