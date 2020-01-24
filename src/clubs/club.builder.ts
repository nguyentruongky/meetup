import * as Types from "../resolvers-types"
import * as Builder from "../utils/builder"
import * as Utility from "../utils/utils"
import jwt from "jwt-simple"
import Stripe from "stripe"

export class MClubBuilder {
    static create(raw: any): Types.MClub {
        const club = new Types.MClub()
        if (Object.keys(raw).length === 0) {
            return
        }
        if (raw.id === undefined) {
            club.id = Utility.uuid()
        } else {
            club.id = raw.id
        }
        club.title = raw.title
        club.host = raw.host
        club.description = raw.description
        club.time = Builder.User.MTimeBuilder.create(raw)
        club.location = Builder.User.MLocationBuilder.create(raw)
        club.slotCount = raw.slotCount
        club.frequency = raw.frequency
        club.coverImageUrl = raw.coverImageUrl
        return club
    }

    static createFromInput(input: Types.CreateClubInput): Types.MClub {
        const club: Types.MClub = new Types.MClub()
        club.id = Utility.uuid()
        club.title = input.title
        if (input.host !== undefined) {
            club.host = input.host.map(id => {
                return Builder.User.MUserBuilder.createFromId(id)
            })
        }
        club.description = input.description
        club.time = input.time
        club.location = input.location
        club.slotCount = input.slotCount
        club.frequency = input.frequency
        club.coverImageUrl = input.coverImageUrl
        if (input.fee) {
            const fee = FeeBuilder.create(input.fee)
            club.fee = fee
        }
        return club
    }
}

export class ClubAttendanceResultBuilder {
    static create(
        status: Types.ClubAttendanceStatus,
        errorMessage: string = null
    ): Types.ClubAttendanceResult {
        const result = new Types.ClubAttendanceResult()
        result.status = status
        result.errorMessage = errorMessage
        return result
    }
}

export class FeeBuilder {
    static createFromSQL(raw: any): Types.Fee {
        const fee = new Types.Fee()
        fee.id = raw.id
        fee.amount = raw.amount
        fee.clubId = raw.clubId
        if (raw.currency) {
            fee.currency = raw.currency
        } else {
            fee.currency = "USD"
        }
        fee.tierId = raw.tierId
        fee.tierDescription = raw.tierDescription
        return fee
    }
    static create(raw: Types.FeeInput): Types.Fee {
        const fee = new Types.Fee()
        fee.id = Utility.uuid()
        fee.amount = raw.amount
        fee.clubId = raw.clubId
        if (raw.currency) {
            fee.currency = raw.currency
        } else {
            fee.currency = "USD"
        }
        fee.tierId = raw.tierId
        fee.tierDescription = raw.tierDescription
        return fee
    }
}
