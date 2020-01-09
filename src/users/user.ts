import jwt from "jwt-simple"
import { UUID } from "../utils/uuid"

export default class MUser {
    id: string
    name: string
    email: string
    password: string
    avatar: string
    // location: MLocation
    introduction: string
    createdAt: number
    token: string
    // role: MRole

    constructor(raw: any) {
        this.id = UUID.generate()
        this.name = raw.name
        this.avatar = raw.avatar
        this.email = raw.email
        this.password = raw.password
        // this.location = location
        this.introduction = raw.introduction
    }

    generateToken() {
        return jwt.encode({ userId: this.id }, "shhhhh", "HS512")
    }
}
