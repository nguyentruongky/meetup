import * as Types from "../resolvers-types"

export default interface MContext {
    token: string
    user: Types.MUser
    error: any
}
