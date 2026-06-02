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