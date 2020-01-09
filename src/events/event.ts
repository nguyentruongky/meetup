import MLocation from "../models/location"
import MTime from "../models/time"
import MUser from "../users/user"
import UUID from "utils/uuid"

export class Event {
    id: string
    title: string
    host: MUser
    description: string
    attendees: MUser[]
    time: MTime
    location: MLocation
    slotsLeft: number

    constructor(raw: any) {
        this.id = UUID.generate()
        this.title = raw.title
        this.host = raw.host
        this.description = raw.description
        this.time = new MTime(raw.time)
        this.location = new MLocation(raw.location)
        this.slotsLeft = raw.slotsLeft
    }
}
