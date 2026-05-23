import { AppError } from "./app.error.js";

// 1. 공통 에러
export class BadRequestException extends AppError {
    constructor(message: string, data: unknown = null) {
        super({
            errorCode: "BAD_REQUEST",
            statusCode: 400,
            message,
            data,
        });
    }
}

export class UnauthorizedException extends AppError {
    constructor(message: string, data: unknown = null) {
        super({
            errorCode: "UNAUTHORIZED",
            statusCode: 401,
            message,
            data,
        });
    }
}

export class NotFoundException extends AppError {
    constructor(message: string, data: unknown = null) {
        super({
            errorCode: "NOT_FOUND",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class ConflictException extends AppError {
    constructor(message: string, data: unknown = null) {
        super({
            errorCode: "CONFLICT",
            statusCode: 409,
            message,
            data,
        });
    }
}


// 2. 도메인별 에러
export class DuplicateUserEmailError
    extends ConflictException {

    constructor(data: unknown = null) {
        super(
            "이미 존재하는 이메일입니다.",
            data
        );
    }
}

export class InvalidCredentialsError
    extends UnauthorizedException {

    constructor(data: unknown = null) {
        super(
            "이메일 또는 비밀번호가 올바르지 않습니다.",
            data
        );
    }
}

export class MissionAlreadyOngoingError
    extends BadRequestException {

    constructor(data: unknown = null) {
        super(
            "이미 진행 중인 미션입니다.",
            data
        );
    }
}

export class RestaurantNotFoundError
    extends NotFoundException {

    constructor(data: unknown = null) {
        super(
            "존재하지 않는 식당입니다.",
            data
        );
    }
}

export class ReviewAlreadyExistsError
    extends ConflictException {

    constructor(data: unknown = null) {
        super(
            "이미 리뷰가 존재합니다.",
            data
        );
    }
}