const FormatError = require("easygraphql-format-error")
export enum MErrorType {
    UNAUTHORIZED = "UNAUTHORIZED",
    BAD_REQUEST = "BAD_REQUEST",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    FORBIDDEN = "FORBIDDEN",
    EMAIL_EXIST = "EMAIL_EXIST"
}
export const formatError = new FormatError([
    {
        name: MErrorType.UNAUTHORIZED,
        message: "Unauthorized",
        statusCode: 401
    },
    {
        name: MErrorType.EMAIL_EXIST,
        message: "Email exist",
        statusCode: 403
    },
    {
        name: "ServerError",
        message: "Internal server error",
        statusCode: 500
    },
    {
        name: MErrorType.BAD_REQUEST,
        message: "Missing information",
        statusCode: 400
    },
    {
        name: MErrorType.NOT_FOUND,
        message: "Not Found",
        statusCode: 404
    },
    {
        name: MErrorType.FORBIDDEN,
        message: "You don't have permission",
        statusCode: 403
    },
])
