const FormatError = require("easygraphql-format-error")

export enum Type {
    UNAUTHORIZED,
    BAD_REQUEST,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    FORBIDDEN,
    EMAIL_EXIST,
}

export const Unauthorized = new Error(Type[Type.UNAUTHORIZED])
export const BadRequest = new Error(Type[Type.BAD_REQUEST])
export const NotFound = new Error(Type[Type.NOT_FOUND])
export const Internal = new Error(Type[Type.INTERNAL_SERVER_ERROR])
export const Forbidden = new Error(Type[Type.FORBIDDEN])
export const EmailExists = new Error(Type[Type.EMAIL_EXIST])
export function create(type: Type, message: string) {
    const err = new Error(Type[type])
    err.name = message
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
