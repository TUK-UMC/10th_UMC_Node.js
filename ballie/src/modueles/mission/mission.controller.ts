import { Body, Controller, Example, Get, Path, Post, Response, Route, Tags } from "tsoa";
import { MissionRestaurantCreateRequest, MissionRestaurantCreateResponse, RestaurantMissionDTO } from "./mission.dto.js";
import { restaurantMissionAdd, getRestaurantMissions } from "./mission.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";
import { InternalServerException } from "../../common/error/error.js";
import {
    ErrorResponse,
    missionCreateRequestExample,
    missionCreateResponseExample,
    restaurantMissionsExample,
    restaurantNotFoundError,
    internalServerError,
} from "./mission.swagger.js";

@Route("missions")
@Tags("missions")
export class MissionController extends Controller {
    /**
     * 식당 미션 추가
     * @summary 특정 식당에 미션을 추가합니다.
     */
    @Post("restaurant/{restaurantId}")
    @Example<MissionRestaurantCreateRequest>(missionCreateRequestExample)
    @Response<ApiResponse<MissionRestaurantCreateResponse>>(201, "식당 미션 추가 성공", missionCreateResponseExample)
    @Response<ErrorResponse>(404, "존재하지 않는 식당", restaurantNotFoundError)
    @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
    public async handleMissionAdd(
        @Path() restaurantId: number,
        @Body() body: MissionRestaurantCreateRequest,
    ): Promise<ApiResponse<MissionRestaurantCreateResponse>> {
        try {
            const mission = await restaurantMissionAdd(body, restaurantId);
            return success(mission);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new InternalServerException("알 수 없는 오류가 발생했습니다");
        }
    }

    /**
     * 식당 미션 목록 조회
     * @summary 특정 식당의 미션 목록을 조회합니다.
     */
    @Get("restaurant/{restaurantId}")
    @Example<ApiResponse<RestaurantMissionDTO[]>>(restaurantMissionsExample)
    @Response<ErrorResponse>(404, "존재하지 않는 식당", restaurantNotFoundError)
    @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
    public async handleGetRestaurantMissions(
        @Path() restaurantId: number,
    ): Promise<ApiResponse<RestaurantMissionDTO[]>> {
        try {
            const missions = await getRestaurantMissions(restaurantId);
            return success(missions);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new InternalServerException("알 수 없는 오류가 발생했습니다");
        }
    }
}
