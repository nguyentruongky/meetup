import MLocation from "../models/location"
import MTime from "../models/time"
import MUser from "../users/user"
import UUID from "../utils/uuid"
import { Frequency } from "models/Frequency"
import CreateClubInput from "models/createClubInput"

export default class MClub {
    id: string
    title: string
    host: MUser[]
    description: string
    attendees: MUser[]
    time: MTime
    location: MLocation
    slotCount: number
    frequency: Frequency
    static createFromInput(input: CreateClubInput): MClub {
        const club: MClub = new MClub({})
        club.id = UUID.generate()
        club.title = input.title
        club.host = input.host
        club.description = input.description
        club.time = input.time
        club.location = input.location
        club.slotCount = input.slotCount
        club.frequency = input.frequency
        return club
    }
    constructor(raw: any = {}) {
        if (Object.keys(raw).length === 0) { 
            return
        }
        if (raw.id === undefined) {
            this.id = UUID.generate()
        } else {
            this.id = raw.id
        }
        this.title = raw.title
        this.host = raw.host
        this.description = raw.description
        this.time = new MTime(raw)
        this.location = new MLocation(raw)
        this.slotCount = raw.slotCount
        this.frequency = raw.frequency
    }
}
