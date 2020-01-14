import MUser from "../users/user"
import MTime from "./time"
import MLocation from "./location"
import { Frequency } from "./Frequency"

export default class CreateClubInput {
    title: string
    host: MUser[]
    description: string
    time: MTime
    location: MLocation
    slotCount: number
    frequency: Frequency

    constructor(raw: any, creator: MUser) {
        this.title = raw.title
        if (raw.host !== undefined) {
            this.host = raw.host.map(raw => {
                return MUser.createFromId(raw)
            })
        } else {
            this.host = []
        }
        this.host.push(creator)
        
        this.description = raw.description
        this.time = new MTime(raw.time)
        this.location = new MLocation(raw.location)
        this.slotCount = raw.slotCount
        this.frequency = raw.frequency
    }
}
