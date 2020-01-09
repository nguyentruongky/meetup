import { MLocation } from "../models/location"
import { MTime } from "../models/time"
import MUser from "../users/user"

export class Event {
    id: string
    title: string
    host: MUser
    description: string
    attendees: MUser[]
    time: MTime
    location: MLocation
    slotsLeft: number

    constructor(
        id: string,
        title: string,
        host: MUser,
        description: string,
        attendees: MUser[],
        time: MTime,
        location: MLocation,
        slotsLeft: number
    ) {
        this.id = id
        this.title = title
        this.host = host
        this.description = description
        this.attendees = attendees
        this.time = time
        this.location = location
        this.slotsLeft = slotsLeft
    }
}
