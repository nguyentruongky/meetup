import { MUser } from "./user"

export const register = async (obj, { signupReq }, context, info) => { 
    return new MUser("Ky", "", "")
}