import { ApiResponse } from "../../common/response/response.js";
import { UserMissionStartResponse, UserRestaurantMissionDTO, ActiveUserMissionDTO } from "./userMission.dto.js";
import { ErrorResponse, internalServerError, unauthorizedError } from "../../common/swagger/common.swagger.js";
import { ErrorCode } from "../../common/error/error.code.js";

export type { ErrorResponse };

// ========================
// 미션 도전 등록
// ========================
export const userMissionStartResponseExample: ApiResponse<UserMissionStartResponse> = {
  resultType: "SUCCESS",
  data: {
    userMissionId: 1,
    userMissionStatus: "CHALLENGING",
    userId: 1,
    missionId: 3,
    missionTitle: "음료 2잔 주문하기",
    missionContent: "아메리카노 또는 라떼 2잔 이상 주문 시 달성",
    missionPoint: 500,
    missionType: "RESTAURANT",
  },
};

// ========================
// 내 식당 미션 목록 조회
// ========================
export const userRestaurantMissionsExample: ApiResponse<UserRestaurantMissionDTO[]> = {
  resultType: "SUCCESS",
  data: [
    {
      userMissionId: 1,
      missionId: 3,
      missionTitle: "음료 2잔 주문하기",
      missionContent: "아메리카노 또는 라떼 2잔 이상 주문 시 달성",
      missionPoint: 500,
      restaurantId: 10,
      restaurantName: "스타벅스 강남점",
      missionStatus: "CHALLENGING",
    },
  ],
};

// ========================
// 도전중인 미션 목록 조회
// ========================
export const activeUserMissionsExample: ApiResponse<ActiveUserMissionDTO[]> = {
  resultType: "SUCCESS",
  data: [
    {
      missionId: 3,
      userMissionId: 1,
      missionTitle: "음료 2잔 주문하기",
      missionContent: "아메리카노 또는 라떼 2잔 이상 주문 시 달성",
      missionPoint: 500,
    },
  ],
};

// ========================
// 도메인 에러 응답
// ========================
export const userNotFoundError: ErrorResponse = {
  errorCode: ErrorCode.USER_NOT_FOUND,
  message: "존재하지 않는 유저입니다.",
  statusCode: 404,
};

export const missionNotFoundError: ErrorResponse = {
  errorCode: ErrorCode.MISSION_NOT_FOUND,
  message: "존재하지 않는 미션입니다.",
  statusCode: 404,
};

export const userMissionNotFoundError: ErrorResponse = {
  errorCode: ErrorCode.USER_MISSION_NOT_FOUND,
  message: "존재하지 않는 유저-미션입니다.",
  statusCode: 404,
};

export const invalidMissionStatusError: ErrorResponse = {
  errorCode: ErrorCode.USER_MISSION_INVALID_STATUS,
  message: "완료 처리할 수 없는 미션 상태입니다.",
  statusCode: 400,
};

export { unauthorizedError, internalServerError };
