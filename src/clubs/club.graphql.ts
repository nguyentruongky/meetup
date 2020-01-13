export const typeDefs = `
type MClub {
    id: String!
    title: String!
    host: [MUser]!
    description: String!
    attendees: [MUser]
    time: MTime!
    location: MLocation!
    slotCount: Int
    createdAt: Float
    frequency: Frequency!
}

extend type Query {
    getEvents: [MClub!]
    getEvent(id: String!): MClub
}

extend type Mutation {
    createClub(title: String!, description: String!, startAt: Float!, duration: Int!, address: String!, lat: Float!, long: Float!, locationNotes: String, slotCount: Int): MClub!
}

`
