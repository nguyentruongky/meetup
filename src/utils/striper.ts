import Stripe from "stripe"
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
        const output: Stripe.Token = await stripe.tokens.create({ card })

        stripe.customers.createSource(stripeUserId, {
            source: output.id
        })

        return output.id
    }
}
