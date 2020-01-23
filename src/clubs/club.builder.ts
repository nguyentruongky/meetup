import * as Types from "../resolvers-types"
import * as Builder from "../utils/builder"
import UUID from "../utils/uuid"
import jwt from "jwt-simple"
import Stripe from "stripe"

export class MClubBuilder {
    static create(raw: any): Types.MClub {
        const instance = new Types.MClub()
        if (Object.keys(raw).length === 0) {
            return
        }
        if (raw.id === undefined) {
            instance.id = UUID.generate()
        } else {
            instance.id = raw.id
        }
        instance.title = raw.title
        instance.host = raw.host
        instance.description = raw.description
        instance.time = Builder.User.MTimeBuilder.create(raw)
        instance.location = Builder.User.MLocationBuilder.create(raw)
        instance.slotCount = raw.slotCount
        instance.frequency = raw.frequency
        instance.coverImageUrl = raw.coverImageUrl
        return instance
    }

    static createFromInput(input: Types.CreateClubInput): Types.MClub {
        const club: Types.MClub = new Types.MClub()
        club.id = UUID.generate()
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
    static create(raw: Types.FeeInput): Types.Fee {
        const fee = new Types.Fee()
        fee.id = UUID.generate()
        fee.amount = raw.amount
        fee.clubId = raw.clubId
        fee.currency = raw.currency
        fee.tierId = raw.tierId
        fee.tierDescription = raw.tierDescription
        return fee
    }
}
