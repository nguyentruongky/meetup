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
    createClub(input: CreateClubInput): MClub!
}

`
