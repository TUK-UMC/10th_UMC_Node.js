import { ApiResponse } from "../../common/response/response.js";
import { UpdateProfileRequest, UpdateProfileResponse, UserProfileResponse } from "./user.dto.js";
import { reviewInfoDTO } from "../review/review.dto.js";
import { ErrorResponse, internalServerError, unauthorizedError } from "../../common/swagger/common.swagger.js";
import { ErrorCode } from "../../common/error/error.code.js";

export type { ErrorResponse };

// ========================
// 내 프로필 조회
// ========================
export const getUserProfileExample: ApiResponse<UserProfileResponse> = {
  resultType: "SUCCESS",
  data: {
    userId: 1,
    email: "user@example.com",
    name: "홍길동",
    gender: "MALE",
    birth: "2000-01-01",
    address: "서울시 강남구 테헤란로 123",
    phoneNumber: "010-1234-5678",
    preferences: ["한식", "중식"],
  },
};

// ========================
// 프로필 수정
// ========================
export const updateProfileRequestExample: UpdateProfileRequest = {
  gender: "MALE",
  birth: "2000-01-01",
  address: "서울시 강남구 테헤란로 123",
  phoneNumber: "010-1234-5678",
  preferences: [1, 2],
};

export const updateProfileResponseExample: ApiResponse<UpdateProfileResponse> = {
  resultType: "SUCCESS",
  data: {
    userId: 1,
    preferences: ["한식", "중식"],
  },
};

// ========================
// 유저 리뷰 목록 조회
// ========================
export const getUserReviewsExample: ApiResponse<reviewInfoDTO[]> = {
  resultType: "SUCCESS",
  data: [
    {
      reviewId: 1,
      authorId: 1,
      authorName: "홍길동",
      restaurantId: 10,
      restaurantName: "맛있는 식당",
      reviewTitle: "정말 맛있어요!",
      reviewContent: "음식이 신선하고 맛있었습니다. 재방문 의사 있어요.",
      reviewScore: 4.5,
    },
  ],
};

// ========================
// 도메인 에러 응답
// ========================
export const userNotFoundError: ErrorResponse = {
  errorCode: ErrorCode.USER_NOT_FOUND,
  message: "사용자를 찾을 수 없습니다.",
  statusCode: 404,
};

export { unauthorizedError, internalServerError };
