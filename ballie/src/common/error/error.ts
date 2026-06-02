import { AppError } from "./app.error.js";

// HTTP 표준 에러 클래스
export class BadRequestException extends AppError {
    constructor(message: string, errorCode = "BAD_REQUEST") {
        super({ errorCode, statusCode: 400, message });
    }
}

export class UnauthorizedException extends AppError {
    constructor(message: string, errorCode = "UNAUTHORIZED") {
        super({ errorCode, statusCode: 401, message });
    }
}

export class ForbiddenException extends AppError {
    constructor(message: string, errorCode = "FORBIDDEN") {
        super({ errorCode, statusCode: 403, message });
    }
}

export class NotFoundException extends AppError {
    constructor(message: string, errorCode = "NOT_FOUND") {
        super({ errorCode, statusCode: 404, message });
    }
}

export class ConflictException extends AppError {
    constructor(message: string, errorCode = "CONFLICT") {
        super({ errorCode, statusCode: 409, message });
    }
}

export class InternalServerException extends AppError {
    constructor(message: string, errorCode = "INTERNAL_SERVER_ERROR") {
        super({ errorCode, statusCode: 500, message });
    }
}

// 도메인 특화 에러
export class DuplicateUserEmailError extends ConflictException {
    constructor(message = "이미 사용 중인 이메일입니다") {
        super(message, "DUPLICATE_USER_EMAIL");
    }
}

export class UserNotFoundError extends NotFoundException {
    constructor(message = "존재하지 않는 유저입니다") {
        super(message, "USER_NOT_FOUND");
    }
}

export class RestaurantCreateError extends InternalServerException {
    constructor(message = "식당 등록 중 오류가 발생했습니다") {
        super(message, "RESTAURANT_CREATE_FAILED");
    }
}

export class RegionNotFoundError extends NotFoundException {
    constructor(message = "등록되지 않은 지역입니다") {
        super(message, "REGION_NOT_FOUND");
    }
}

export class FoodCategoryNotFoundError extends NotFoundException {
    constructor(message = "등록되지 않은 카테고리입니다") {
        super(message, "FOOD_CATEGORY_NOT_FOUND");
    }
}

export class RestaurantNotFoundError extends NotFoundException {
    constructor(message = "존재하지 않는 식당입니다") {
        super(message, "RESTAURANT_NOT_FOUND");
    }
}

export class ReviewCreateError extends InternalServerException {
    constructor(message = "리뷰 등록 중 오류가 발생했습니다") {
        super(message, "REVIEW_CREATE_FAILED");
    }
}

export class MissionCreateError extends InternalServerException {
    constructor(message = "미션 등록 중 오류가 발생했습니다") {
        super(message, "MISSION_CREATE_FAILED");
    }
}

export class MissionNotFoundError extends NotFoundException {
    constructor(message = "존재하지 않는 미션입니다") {
        super(message, "MISSION_NOT_FOUND");
    }
}

export class UserMissionNotFoundError extends NotFoundException {
    constructor(message = "존재하지 않는 유저 미션입니다") {
        super(message, "USER_MISSION_NOT_FOUND");
    }
}

export class UserMissionStatusError extends BadRequestException {
    constructor(message = "완료할 수 없는 상태의 미션입니다") {
        super(message, "USER_MISSION_INVALID_STATUS");
    }
}

export class UnauthorizedError extends UnauthorizedException {
    constructor(message = "로그인이 필요합니다") {
        super(message, "UNAUTHORIZED");
    }
}

export class InvalidTokenError extends UnauthorizedException {
    constructor(message = "유효하지 않은 토큰입니다") {
        super(message, "INVALID_TOKEN");
    }
}

export class ExpiredTokenError extends UnauthorizedException {
    constructor(message = "만료된 토큰입니다") {
        super(message, "EXPIRED_TOKEN");
    }
}

export class InvalidCategoryError extends BadRequestException {
    constructor(message = "유효하지 않은 카테고리입니다") {
        super(message, "INVALID_CATEGORY");
    }
}
