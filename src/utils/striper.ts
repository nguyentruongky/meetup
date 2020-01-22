import Stripe from "stripe"
import { EnrollOutput, Card } from "../resolvers-types"
import { CardBuilder } from "./builder"
const stripe = new Stripe("sk_test_gUlPGbe57OnirEOH8xb6wHiS00VjQexdTh", {
    apiVersion: "2019-12-03",
    typescript: true
})

export default class Striper {
    async createCustomer(email: string, name: string): Promise<string> {
        const params: Stripe.CustomerCreateParams = {
            description: name,
            email: email
        }

        const customer: Stripe.Customer = await stripe.customers.create(params)
        return customer.id
    }

    async addCard(
        stripeUserId: string,
        cardNumber: string,
        expMonth: string,
        expYear: string,
        cvc: string
    ): Promise<string> {
        const card: Stripe.TokenCreateParams.Card = {
            number: cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvc
        }
        const cardToken: Stripe.Token = await stripe.tokens.create({ card })

        const output = stripe.customers.createSource(stripeUserId, {
            source: cardToken.id
        })

        return (await output).id
    }

    async addCardByToken(
        stripeUserId: string,
        cardTokenId: string
    ): Promise<string> {
        const card = await stripe.customers.createSource(stripeUserId, {
            source: cardTokenId
        })

        return card.id
    }

    async charge(
        stripeUserId: string,
        cardId: string,
        amount: number,
        currency: string
    ) {
        const params: Stripe.ChargeCreateParams = {
            customer: stripeUserId,
            currency: currency,
            amount: amount,
            source: cardId
        }

        const result = await stripe.charges.create(params)
        const output = new EnrollOutput()
        output.enrollId = result.id
        output.cardId = cardId
        output.error = result.failure_message
        output.createdAt = result.created
        return output
    }

    async cardList(stripeUserId: string): Promise<Card[]> {
        const params: Stripe.CustomerSourceListParams = {
            object: "card"
        }
        const cards: any[] = await (
            await stripe.customers.listSources(stripeUserId, params)
        ).data
        const mCards = cards.map(value => {
            return CardBuilder.create(value)
        })
        return mCards
    }
}
