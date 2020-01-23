const FormatError = require("easygraphql-format-error")

export enum Type {
    UNAUTHORIZED,
    BAD_REQUEST,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    FORBIDDEN,
    EMAIL_EXIST
}

export const Unauthorized = new Error(Type.UNAUTHORIZED.toString())
export const BadRequest = new Error(Type.BAD_REQUEST.toString())
export const NotFound = new Error(Type.NOT_FOUND.toString())
export const Internal = new Error(Type.INTERNAL_SERVER_ERROR.toString())
export const Forbidden = new Error(Type.FORBIDDEN.toString())
export const EmailExists = new Error(Type.EMAIL_EXIST.toString())
export function create(type: Type, message: string) {
    const err = new Error(message)
    err.name = type.toString()
    return err
}

export const formatError = new FormatError([
    {
        name: Type.UNAUTHORIZED,
        message: "Unauthorized",
        statusCode: 401
    },
    {
        name: Type.EMAIL_EXIST,
        message: "Email exist",
        statusCode: 403
    },
    {
        name: "ServerError",
        message: "Internal server error",
        statusCode: 500
    },
    {
        name: Type.BAD_REQUEST,
        message: "Missing information",
        statusCode: 400
    },
    {
        name: Type.NOT_FOUND,
        message: "Not Found",
        statusCode: 404
    },
    {
        name: Type.FORBIDDEN,
        message: "You don't have permission",
        statusCode: 403
    }
])
