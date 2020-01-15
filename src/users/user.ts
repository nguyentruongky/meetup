import jwt from "jwt-simple"
import UUID from "../utils/uuid"

export default class MUser {
    id: string
    name: string
    email: string
    password: string
    avatar: string
    introduction: string
    createdAt: number
    token: string

    static createFromId(id: string): MUser {
        const user = new MUser({ id })
        return user
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
        this.name = raw.name
        this.avatar = raw.avatar
        this.email = raw.email
        this.password = raw.password
        this.introduction = raw.introduction
        this.token = raw.token
    }

    generateToken() {
        return jwt.encode({ userId: this.id }, "shhhhh", "HS512")
    }
}
