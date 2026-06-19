import { RestaurantCreateRequest, RestaurantCreateResponse } from "./restaurant.dto.js";
import { restaurantAdd } from "./restaurant.service.js";
import { Body, Controller, Example, Post, Response, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";
import { InternalServerException } from "../../common/error/error.js";
import {
    ErrorResponse,
    restaurantCreateRequestExample,
    restaurantCreateResponseExample,
    regionNotFoundError,
    foodCategoryNotFoundError,
    internalServerError,
} from "./restaurant.swagger.js";

@Route("restaurant")
@Tags("restaurant")
export class RestaurantController extends Controller {
    /**
     * 식당 등록 API
     * @summary 새로운 식당을 등록합니다.
     */
    @Post("")
    @Example<RestaurantCreateRequest>(restaurantCreateRequestExample)
    @Response<ApiResponse<RestaurantCreateResponse>>(201, "식당 등록 성공", restaurantCreateResponseExample)
    @Response<ErrorResponse>(404, "존재하지 않는 지역", regionNotFoundError)
    @Response<ErrorResponse>(404, "존재하지 않는 카테고리", foodCategoryNotFoundError)
    @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
    public async handleRestaurantAdd(
        @Body() body: RestaurantCreateRequest,
    ): Promise<ApiResponse<RestaurantCreateResponse>> {
        try {
            const restaurant = await restaurantAdd(body);
            return success(restaurant);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new InternalServerException("알 수 없는 오류가 발생했습니다");
        }
    }
}
