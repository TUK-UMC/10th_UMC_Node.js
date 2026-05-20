import { AppError } from "./app.error.js";

export class DuplicateUserEmailError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "DUPLICATE_USER_EMAIL",
            statusCode: 409,
            message,
            data,
        });
    }
}
export class InvalidCredentialsError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "INVALID_CREDENTIALS",
            statusCode: 401,
            message,
            data,
        });
    }
}
export class MissionAlreadyOngoingError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "MISSION_ALREADY_ONGOING",
            statusCode: 400,
            message,
            data,
        });
    }
}

export class RestaurantNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "RESTAURANT_NOT_EXIST",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class ReviewAlreadyExistsError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "REVIEW_ALREADY_EXISTS",
            statusCode: 409,
            message,
            data,
        });
    }
}