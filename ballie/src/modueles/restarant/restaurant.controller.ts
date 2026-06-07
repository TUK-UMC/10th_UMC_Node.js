import { RestaurantCreateRequest, RestaurantCreateResponse } from "./restaurant.dto.js";
import { restaurantAdd } from "./restaurant.service.js";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";
import { Response as TsoaResponse } from "tsoa";

@Route("restaurant")
@Tags("restaurant")
export class RestaurantController extends Controller {
    /**
     * 식당 등록 API
     * @summary 새로운 식당을 등록합니다.
     * @param body
     */
    @Post("")
    @TsoaResponse<ApiResponse<RestaurantCreateResponse>>(201,"식당 등록 성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 카테고리 또는 지역")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    public async handleRestaurantAdd(
        @Body() body: RestaurantCreateRequest,
    ): Promise<ApiResponse<RestaurantCreateResponse>> {
        try {
            const restaurant = await restaurantAdd(body);
            return success(restaurant);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }
}
