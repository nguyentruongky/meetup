import {
    MClub,
    MUser,
    MTime,
    MLocation,
    CreateClubInput
} from "../resolvers-types"
import UUID from "./uuid"
import jwt from "jwt-simple"

export class MClubBuilder {
    static create(raw: any): MClub {
        const instance = new MClub()
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
        instance.time = MTimeBuilder.create(raw)
        instance.location = MLocationBuilder.create(raw)
        instance.slotCount = raw.slotCount
        instance.frequency = raw.frequency
        instance.coverImageUrl = raw.coverImageUrl
        return instance
    }

    static createFromInput(input: CreateClubInput): MClub {
        const club: MClub = new MClub()
        club.id = UUID.generate()
        club.title = input.title
        if (input.host !== undefined) {
            club.host = input.host.map(id => {
                return MUserBuilder.createFromId(id)
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

export class MTimeBuilder {
    static create(raw: any): MTime {
        const instance = new MTime()
        instance.startAt = raw.startAt
        instance.endAt = raw.endAt
        instance.duration = raw.endAt - raw.startAt
        instance.timeNotes = raw.timeNotes
        return instance
    }
}

export class MLocationBuilder {
    static create(raw: any): MLocation {
        const instance = new MLocation()
        instance.address = raw.address
        instance.lat = raw.lat
        instance.long = raw.long
        instance.locationNotes = raw.locationNotes
        return instance
    }
}

export class MUserBuilder {
    static create(raw: any): MUser {
        const instance = new MUser()
        if (Object.keys(raw).length === 0) {
            return
        }
        if (raw.id === undefined) {
            instance.id = UUID.generate()
        } else {
            instance.id = raw.id
        }
        instance.name = raw.name
        instance.avatar = raw.avatar
        instance.email = raw.email
        instance.password = raw.password
        instance.introduction = raw.introduction
        instance.token = raw.token
        return instance
    }
    static createFromId(id: string): MUser {
        const user = MUserBuilder.create({ id })
        return user
    }

    static generateToken(userId: any) {
        return jwt.encode({ userId }, "shhhhh", "HS512")
    }
}
