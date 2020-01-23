import * as Types from "../resolvers-types"
import * as Utility from "../utils/utils"
import jwt from "jwt-simple"
import Stripe from "stripe"

export class MTimeBuilder {
    static create(raw: any): Types.MTime {
        const instance = new Types.MTime()
        instance.startAt = raw.startAt
        instance.endAt = raw.endAt
        instance.duration = raw.endAt - raw.startAt
        instance.timeNotes = raw.timeNotes
        return instance
    }
}

export class MLocationBuilder {
    static create(raw: any): Types.MLocation {
        const instance = new Types.MLocation()
        instance.address = raw.address
        instance.lat = raw.lat
        instance.long = raw.long
        instance.locationNotes = raw.locationNotes
        return instance
    }
}

export class MUserBuilder {
    static create(raw: any): Types.MUser {
        const instance = new Types.MUser()
        if (Object.keys(raw).length === 0) {
            return
        }
        if (raw.id === undefined) {
            instance.id = Utility.uuid()
        } else {
            instance.id = raw.id
        }
        instance.name = raw.name
        instance.avatar = raw.avatar
        instance.email = raw.email
        instance.password = raw.password
        instance.introduction = raw.introduction
        instance.token = raw.token
        instance.stripeUserId = raw.stripeUserId
        return instance
    }
    static createFromId(id: string): Types.MUser {
        const user = MUserBuilder.create({ id })
        return user
    }

    static generateToken(userId: any) {
        return jwt.encode({ userId }, "shhhhh", "HS512")
    }
}

export class CardBuilder {
    static create(raw: any): Types.Card {
        const c = new Types.Card()
        c.expMonth = raw.exp_month
        c.expYear = raw.exp_year
        c.id = raw.id
        c.last4 = raw.last4
        c.type = raw.brand
        return c
    }
}

export class ProfileBuilder {
    static create(user: Types.MUser): Types.Profile {
        const p = new Types.Profile()
        p.avatar = user.avatar
        p.cards = user.cards
        p.clubs = user.clubs
        p.createdAt = user.createdAt
        p.email = user.email
        p.id = user.id
        p.introduction = user.introduction
        p.name = user.name
        p.stripeUserId = user.stripeUserId
        return p
    }
}