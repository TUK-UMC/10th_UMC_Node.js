import { ApiResponse } from "../../common/response/response.js";
import { RestaurantCreateRequest, RestaurantCreateResponse } from "./restaurant.dto.js";
import { ErrorResponse, internalServerError } from "../../common/swagger/common.swagger.js";
import { ErrorCode } from "../../common/error/error.code.js";

export type { ErrorResponse };

// ========================
// 식당 등록
// ========================
export const restaurantCreateRequestExample: RestaurantCreateRequest = {
  restaurantName: "스타벅스 강남점",
  regionId: 1,
  foodCategoryId: 3,
};

export const restaurantCreateResponseExample: ApiResponse<RestaurantCreateResponse> = {
  resultType: "SUCCESS",
  data: {
    restaurantId: 10,
    restaurantName: "스타벅스 강남점",
    foodCategory: "카페/디저트",
    regionName: "서울 강남구",
  },
};

// ========================
// 도메인 에러 응답
// ========================
export const regionNotFoundError: ErrorResponse = {
  errorCode: ErrorCode.REGION_NOT_FOUND,
  message: "존재하지 않는 지역입니다.",
  statusCode: 404,
};

export const foodCategoryNotFoundError: ErrorResponse = {
  errorCode: ErrorCode.FOOD_CATEGORY_NOT_FOUND,
  message: "존재하지 않는 카테고리입니다.",
  statusCode: 404,
};

export { internalServerError };
