import gql from "graphql-tag";

export const schema = gql`
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
    coverImageUrl: String
    fee: Fee
}

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

type Query {
    clubs: [MClub!]
    club(id: String!): MClub
    search(keyword: String!): [MClub!]
}

type Mutation {
    club(input: CreateClubInput): MClub!
    joinClub(clubId: String!): ClubAttendanceResult!
    quitClub(clubId: String!): ClubAttendanceResult!
    addFee(fee: FeeInput!): Fee
}

type ClubAttendanceResult {
    status: ClubAttendanceStatus!
    errorMessage: String
}

enum ClubAttendanceStatus {
    success
    fail
    needPaymentSource
}

type Fee {
    id: String!
    clubId: String!
    amount: Float
    currency: String
    tierId: String
    tierDescription: String
}

input FeeInput {
    clubId: String!
    amount: Float!
    currency: String!
    tierId: String
    tierDescription: String
}

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

extend type Mutation {
    register(email: String!, password: String!, name: String!): MUser!
    login(email: String!, password: String!): MUser
}

enum Frequency {
    daily
    weekly
    biweekly
    monthly
}

type MLocation {
    address: String
    lat: Float
    long: Float
    locationNotes: String
}

input MLocationInput {
    address: String
    lat: Float!
    long: Float!
    locationNotes: String
}

type MTime {
    startAt: Float
    endAt: Float
    duration: Float
    timeNotes: String
}

input MTimeInput {
    startAt: Float!
    endAt: Float!
    duration: Float
    timeNotes: String
}
`
