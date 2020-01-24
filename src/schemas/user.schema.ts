import gql from "graphql-tag"

export const schema = gql`
    type MUser {
        id: String
        name: String
        email: String
        password: String
        token: String
        avatar: String
        introduction: String
        stripeUserId: String
        createdAt: Float
        cards: [Card]
        clubs: [MClub]
    }

    type Profile {
        id: String
        name: String
        email: String
        avatar: String
        introduction: String
        stripeUserId: String
        createdAt: Float
        cards: [Card]
        clubs: [MClub]
    }

    input PatchUserInput {
        name: String
        email: String
        avatar: String
        introduction: String
    }
    type Card {
        id: String!
        last4: String!
        type: String!
        expMonth: Int!
        expYear: Int!
    }
`
