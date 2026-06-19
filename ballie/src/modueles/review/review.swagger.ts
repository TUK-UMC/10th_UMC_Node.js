import { ApiResponse } from "../../common/response/response.js";
import { ReviewCreateRequest, ReviewCreateResponse } from "./review.dto.js";
import { ErrorResponse, internalServerError, unauthorizedError } from "../../common/swagger/common.swagger.js";
import { ErrorCode } from "../../common/error/error.code.js";

export type { ErrorResponse };

// ========================
// 리뷰 등록
// ========================
export const reviewCreateRequestExample: ReviewCreateRequest = {
  reviewTitle: "정말 맛있어요!",
  reviewContent: "음식이 신선하고 서비스도 훌륭했습니다. 재방문 의사 있어요.",
  score: 4.5,
};

export const reviewCreateResponseExample: ApiResponse<ReviewCreateResponse> = {
  resultType: "SUCCESS",
  data: {
    authorId: 1,
    authorName: "홍길동",
    restaurantId: 10,
    restaurantName: "스타벅스 강남점",
    reviewId: 5,
    reviewContent: "음식이 신선하고 서비스도 훌륭했습니다. 재방문 의사 있어요.",
    reviewTime: "2024-01-15T12:00:00.000Z",
    reviewScore: 4.5,
  },
};

// ========================
// 도메인 에러 응답
// ========================
export const restaurantNotFoundError: ErrorResponse = {
  errorCode: ErrorCode.RESTAURANT_NOT_FOUND,
  message: "존재하지 않는 식당입니다.",
  statusCode: 404,
};

export { unauthorizedError, internalServerError };
