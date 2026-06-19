import { ApiResponse } from "../../common/response/response.js";
import { MissionRestaurantCreateRequest, MissionRestaurantCreateResponse, RestaurantMissionDTO } from "./mission.dto.js";
import { ErrorResponse, internalServerError } from "../../common/swagger/common.swagger.js";
import { ErrorCode } from "../../common/error/error.code.js";

export type { ErrorResponse };

// ========================
// 식당 미션 추가
// ========================
export const missionCreateRequestExample: MissionRestaurantCreateRequest = {
  point: 500,
  title: "음료 2잔 주문하기",
  content: "아메리카노 또는 라떼 2잔 이상 주문 시 달성",
};

export const missionCreateResponseExample: ApiResponse<MissionRestaurantCreateResponse> = {
  resultType: "SUCCESS",
  data: {
    missionId: 1,
    restaurantId: 10,
    point: 500,
    title: "음료 2잔 주문하기",
    content: "아메리카노 또는 라떼 2잔 이상 주문 시 달성",
    type: "RESTAURANT",
    missionRestaurantId: 1,
  },
};

// ========================
// 식당 미션 목록 조회
// ========================
export const restaurantMissionsExample: ApiResponse<RestaurantMissionDTO[]> = {
  resultType: "SUCCESS",
  data: [
    {
      missionId: 1,
      missionTitle: "음료 2잔 주문하기",
      missionContent: "아메리카노 또는 라떼 2잔 이상 주문 시 달성",
      missionPoint: 500,
      missionType: "RESTAURANT",
      restaurantId: 10,
      restaurantName: "스타벅스 강남점",
    },
  ],
};

// ========================
// 도메인 에러 응답
// ========================
export const restaurantNotFoundError: ErrorResponse = {
  errorCode: ErrorCode.RESTAURANT_NOT_FOUND,
  message: "존재하지 않는 식당입니다.",
  statusCode: 404,
};

export { internalServerError };
