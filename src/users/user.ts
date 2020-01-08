// import { MLocation } from "@/models/location"
import { UUID } from "../utils/uuid"

export class MUser {
    id: string
    name: string
    avatar: string
    // location: MLocation
    introduction: string
    createdAt: number
    // role: MRole

    constructor(
        name: string,
        avatar: string,
        // location: MLocation,
        introduction: string
    ) {
        this.id = UUID.generate()
        this.name = name
        this.avatar = avatar
        // this.location = location
        this.introduction = introduction
    }
}
