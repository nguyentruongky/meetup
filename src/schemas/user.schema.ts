import gql from "graphql-tag"

export const schema = gql`
    #TYPE: Type Definition
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

    type Card {
        id: String!
        last4: String!
        type: String!
        expMonth: Int!
        expYear: Int!
    }

    #INPUT
    input PatchUserInput {
        name: String
        email: String
        avatar: String
        introduction: String
    }

    #QUERY
    extend type Query {
        cards: [Card!]!
        me: MUser!
    }

    #MUTATION
    extend type Mutation {
        register(email: String!, password: String!, name: String!): MUser!
        login(email: String!, password: String!): MUser
        addCard(
            number: String!
            expMonth: String!
            expYear: String!
            cvc: String!
        ): String!
        addCardByToken(token: String!): String!
        patchUser(input: PatchUserInput!): MUser
        resetPassword(email: String!): String
    }
`
