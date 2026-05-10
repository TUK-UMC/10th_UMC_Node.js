import { RestaurantCreateRequest, RestaurantCreateResponse } from "./restaurant.dto.js";
import { restaurantAdd } from "./restaurant.service.js";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";

@Route("restaurant")
@Tags("restaurant")
export class RestaurantController extends Controller {
    @Post("")
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
