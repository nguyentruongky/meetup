import MLocation from "../models/location"
import MTime from "../models/time"
import MUser from "../users/user"
import UUID from "../utils/uuid"

export default class MClub {
    id: string
    title: string
    host: MUser[]
    description: string
    attendees: MUser[]
    time: MTime
    location: MLocation
    slotCount: number

    constructor(raw: any) {
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
    }
}
