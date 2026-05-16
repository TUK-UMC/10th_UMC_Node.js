import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { MissionRestaurantCreateRequest, MissionRestaurantCreateResponse, RestaurantMissionDTO } from "./mission.dto.js";
import { restaurantMissionAdd, getRestaurantMissions } from "./mission.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";
import { Response as TsoaResponse } from "tsoa";

@Route("missions")
@Tags("missions")
export class MissionController extends Controller {
    /**
     * 식당 미션 추가
     * @summary 특정 식당에 미션을 추가합니다.
     * @param restaurantId
     * @param body
     */
    @Post("restaurant/{restaurantId}")
    @TsoaResponse<ApiResponse<MissionRestaurantCreateResponse>>(201, "식당 미션 추가 성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 식당")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
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

    /**
     * 식당 미션 읽어오기 API
     * @summary 특정 식당의 미션 목록을 조회합니다.
     * @param restaurantId
     */
    @Get("restaurant/{restaurantId}")
    @TsoaResponse<ApiResponse<RestaurantMissionDTO[]>>(200,"식당 미션 목록 조회 성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 식당")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
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
