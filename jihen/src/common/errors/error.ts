import { AppError } from "./app.error";

export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "U001", statusCode: 409, message, data });
  }
}

export class DuplicateStoreError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "S001", statusCode: 409, message, data });
  }
}

export class StoreNotFoundError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "S002", statusCode: 404, message, data });
  }
}

export class MissionNotFoundError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "M001", statusCode: 404, message, data });
  }
}

export class DuplicateMissionChallengeError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "M002", statusCode: 409, message, data });
  }
}
