const FormatError = require("easygraphql-format-error")
export enum Type {
    UNAUTHORIZED = "UNAUTHORIZED",
    BAD_REQUEST = "BAD_REQUEST",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    FORBIDDEN = "FORBIDDEN",
    EMAIL_EXIST = "EMAIL_EXIST"
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
