import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { MissionRestaurantCreateRequest, MissionRestaurantCreateResponse, RestaurantMissionDTO } from "./mission.dto.js";
import { restaurantMissionAdd, getRestaurantMissions } from "./mission.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";

@Route("missions")
@Tags("missions")
export class MissionController extends Controller {
    @Post("restaurant/{restaurantId}")
    public async handleMissionAdd(
        @Path() restaurantId: number,
        @Body() body: MissionRestaurantCreateRequest,
    ): Promise<ApiResponse<MissionRestaurantCreateResponse>> {
        try {
            const mission = await restaurantMissionAdd(body, restaurantId);
            return success(mission);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }

    @Get("restaurant/{restaurantId}")
    public async handleGetRestaurantMissions(
        @Path() restaurantId: number,
    ): Promise<ApiResponse<RestaurantMissionDTO[]>> {
        try {
            const missions = await getRestaurantMissions(restaurantId);
            return success(missions);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }
}
