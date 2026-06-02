import { AppError } from "./app.error";

export class DuplicateUserEmailError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "U001",
            statusCode: 409,
            message,
            data,
        });
    }
}

export class UserNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "U002",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class RestaurantCreateError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "R001",
            statusCode: 500,
            message,
            data,
        });
    }
}

export class RegionNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "R002",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class FoodCategoryNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "R003",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class RestaurantNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "R004",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class ReviewCreateError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "RV001",
            statusCode: 500,
            message,
            data,
        });
    }
}

export class MissionCreateError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "M001",
            statusCode: 500,
            message,
            data,
        });
    }
}

export class MissionNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "M002",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class UserMissionNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "UM001",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class UserMissionStatusError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "UM002",
            statusCode: 400,
            message,
            data,
        });
    }
}
