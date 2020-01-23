import { MUser } from "../resolvers-types"

export default interface MContext {
    token: string 
    user: MUser
    error: any
}