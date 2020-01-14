export const typeDefs = `
input CreateClubInput {
    title: String!
    host: [String]
    description: String!
    time: MTimeInput!
    location: MLocationInput!
    slotCount: Float!
    frequency: Frequency!
    coverImageUrl: String
}
`
