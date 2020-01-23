import * as Types from "../resolvers-types"

export interface MContext {
    token: string
    user: Types.MUser
    error: any
}
