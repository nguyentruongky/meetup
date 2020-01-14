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
    clubs: [MClub!]
    club(id: String!): MClub
    search(keyword: String!): [MClub!]
}

extend type Mutation {
    club(input: CreateClubInput): MClub!
}

`
