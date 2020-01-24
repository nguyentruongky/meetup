import gql from "graphql-tag"

export const schema = gql`
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
    }

    extend type Query {
        cards: [Card!]!
        me: MUser!
    }
`
