import { ErrorCode } from "../error/error.code.js";

/** 에러 응답 스키마 */
export interface ErrorResponse {
  errorCode: string;
  message: string;
  statusCode: number;
}

// ========================
// 공통 에러 응답 예시
// ========================
export const unauthorizedError: ErrorResponse = {
  errorCode: ErrorCode.UNAUTHORIZED,
  message: "인증되지 않은 사용자입니다. 로그인 후 이용해주세요.",
  statusCode: 401,
};

export const internalServerError: ErrorResponse = {
  errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
  message: "서버 내부 오류가 발생했습니다.",
  statusCode: 500,
};
