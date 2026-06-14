import { AppError } from "./app.error.js";
import { ErrorCode } from "./error.code.js";

// HTTP 표준 에러 클래스
export class BadRequestException extends AppError {
    constructor(message: string, errorCode = ErrorCode.BAD_REQUEST) {
        super({ errorCode, statusCode: 400, message });
    }
}

export class UnauthorizedException extends AppError {
    constructor(message: string, errorCode = ErrorCode.UNAUTHORIZED) {
        super({ errorCode, statusCode: 401, message });
    }
}

export class ForbiddenException extends AppError {
    constructor(message: string, errorCode = ErrorCode.FORBIDDEN) {
        super({ errorCode, statusCode: 403, message });
    }
}

export class NotFoundException extends AppError {
    constructor(message: string, errorCode = ErrorCode.NOT_FOUND) {
        super({ errorCode, statusCode: 404, message });
    }
}

export class ConflictException extends AppError {
    constructor(message: string, errorCode = ErrorCode.CONFLICT) {
        super({ errorCode, statusCode: 409, message });
    }
}

export class InternalServerException extends AppError {
    constructor(message: string, errorCode = ErrorCode.INTERNAL_SERVER_ERROR) {
        super({ errorCode, statusCode: 500, message });
    }
}

// A: Auth 에러
export class InvalidTokenError extends UnauthorizedException {
    constructor(message = "유효하지 않은 토큰입니다") {
        super(message, ErrorCode.INVALID_TOKEN);
    }
}

export class ExpiredTokenError extends UnauthorizedException {
    constructor(message = "만료된 토큰입니다") {
        super(message, ErrorCode.EXPIRED_TOKEN);
    }
}

export class UnauthorizedError extends UnauthorizedException {
    constructor(message = "로그인이 필요합니다") {
        super(message, ErrorCode.UNAUTHORIZED);
    }
}

// U: User 에러
export class UserNotFoundError extends NotFoundException {
    constructor(message = "존재하지 않는 유저입니다") {
        super(message, ErrorCode.USER_NOT_FOUND);
    }
}

export class DuplicateUserEmailError extends ConflictException {
    constructor(message = "이미 사용 중인 이메일입니다") {
        super(message, ErrorCode.DUPLICATE_USER_EMAIL);
    }
}

export class InvalidCategoryError extends BadRequestException {
    constructor(message = "유효하지 않은 카테고리입니다") {
        super(message, ErrorCode.INVALID_CATEGORY);
    }
}

// R: Restaurant 에러
export class RestaurantNotFoundError extends NotFoundException {
    constructor(message = "존재하지 않는 식당입니다") {
        super(message, ErrorCode.RESTAURANT_NOT_FOUND);
    }
}

export class RestaurantCreateError extends InternalServerException {
    constructor(message = "식당 등록 중 오류가 발생했습니다") {
        super(message, ErrorCode.RESTAURANT_CREATE_FAILED);
    }
}

export class RegionNotFoundError extends NotFoundException {
    constructor(message = "등록되지 않은 지역입니다") {
        super(message, ErrorCode.REGION_NOT_FOUND);
    }
}

export class FoodCategoryNotFoundError extends NotFoundException {
    constructor(message = "등록되지 않은 카테고리입니다") {
        super(message, ErrorCode.FOOD_CATEGORY_NOT_FOUND);
    }
}

// M: Mission 에러
export class MissionNotFoundError extends NotFoundException {
    constructor(message = "존재하지 않는 미션입니다") {
        super(message, ErrorCode.MISSION_NOT_FOUND);
    }
}

export class MissionCreateError extends InternalServerException {
    constructor(message = "미션 등록 중 오류가 발생했습니다") {
        super(message, ErrorCode.MISSION_CREATE_FAILED);
    }
}

// UM: UserMission 에러
export class UserMissionNotFoundError extends NotFoundException {
    constructor(message = "존재하지 않는 유저 미션입니다") {
        super(message, ErrorCode.USER_MISSION_NOT_FOUND);
    }
}

export class UserMissionStatusError extends BadRequestException {
    constructor(message = "완료할 수 없는 상태의 미션입니다") {
        super(message, ErrorCode.USER_MISSION_INVALID_STATUS);
    }
}

// RV: Review 에러
export class ReviewCreateError extends InternalServerException {
    constructor(message = "리뷰 등록 중 오류가 발생했습니다") {
        super(message, ErrorCode.REVIEW_CREATE_FAILED);
    }
}
