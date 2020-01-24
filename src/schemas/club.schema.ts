import gql from "graphql-tag"

export const schema = gql`
    type MClub {
        id: String!
        title: String!
        host: [MUser]!
        description: String!
        attendees: [MUser]
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
        location: MLocationInput!
        slotCount: Float!
        frequency: Frequency!
        fee: FeeInput
        coverImageUrl: String
    }

    type Query {
        clubs: [MClub!]
        club(id: String!): MClub
        search(keyword: String!): [MClub!]
    }

    type Mutation {
        createClub(input: CreateClubInput): MClub!
        joinClub(clubId: String!): ClubAttendanceResult!
        quitClub(clubId: String!): ClubAttendanceResult!
        addFee(fee: FeeInput!): Fee
        favorite(clubId: String!): Boolean
    }

    input EnrollInput {
        cardId: String!
        feeTierId: String!
    }

    type EnrollOutput {
        error: String
        cardId: String!
        fee: Fee!
        enrollId: String!
        createdAt: Float!
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
        amount: Float!
        currency: String!
        tierId: String!
        tierDescription: String
    }

    input FeeInput {
        """
        Leave clubId null while create new club
        """
        clubId: String
        amount: Float!
        """
        Default is USD
        """
        currency: String
        """
        Descriptive name to remember yourself. For instance: 3mon, 1yr
        """
        tierId: String
        tierDescription: String
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
