import { AppError } from "./app.error";

// HTTP 표준 에러 클래스
export class ConflictException extends AppError {
  constructor(message: string, errorCode = "CONFLICT", data?: unknown) {
    super({ errorCode, statusCode: 409, message, data });
  }
}

export class NotFoundException extends AppError {
  constructor(message: string, errorCode = "NOT_FOUND", data?: unknown) {
    super({ errorCode, statusCode: 404, message, data });
  }
}

export class UnauthorizedException extends AppError {
  constructor(message: string, errorCode = "UNAUTHORIZED", data?: unknown) {
    super({ errorCode, statusCode: 401, message, data });
  }
}

// 도메인 특화 에러 (HTTP 에러 클래스 상속)
export class DuplicateUserEmailError extends ConflictException {
  constructor(message: string, data?: unknown) {
    super(message, "DUPLICATE_USER_EMAIL", data);
  }
}

export class DuplicateStoreError extends ConflictException {
  constructor(message: string, data?: unknown) {
    super(message, "DUPLICATE_STORE", data);
  }
}

export class StoreNotFoundError extends NotFoundException {
  constructor(message: string, data?: unknown) {
    super(message, "STORE_NOT_FOUND", data);
  }
}

export class MissionNotFoundError extends NotFoundException {
  constructor(message: string, data?: unknown) {
    super(message, "MISSION_NOT_FOUND", data);
  }
}

export class DuplicateMissionChallengeError extends ConflictException {
  constructor(message: string, data?: unknown) {
    super(message, "DUPLICATE_MISSION_CHALLENGE", data);
  }
}
