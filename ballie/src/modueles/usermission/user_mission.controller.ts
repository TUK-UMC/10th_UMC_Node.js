import { Controller, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { UserMissionStartResponse, UserRestaurantMissionDTO, ActiveUserMissionDTO } from "./userMission.dto.js";
import { userMissionAdd, getUserRestaurantMission, getActiveUserMission, completeUserMission } from "./user_mission.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";
import { Response as TsoaResponse } from "tsoa";

@Route("userMissions")
@Tags("userMissions")
export class UserMissionController extends Controller {

    /**
     * 유저 - 미션 등록 API
     * @summary 유저에게 미션을 등록합니다.
     * @param userId
     * @param missionId
     */
    @Post("{userId}/mission/{missionId}")
    @TsoaResponse<ApiResponse<UserMissionStartResponse>>(201, "유저-미션 추가 성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 유저")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 미션")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    public async handleUserMissionAdd(
        @Path() userId: number,
        @Path() missionId: number,
    ): Promise<ApiResponse<UserMissionStartResponse>> {
        try {
            const userMission = await userMissionAdd(userId, missionId);
            return success(userMission);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }

    /**
     * 유저의 식당 미션 목록 조회 API
     * @summary 특정 유저의 식당 미션 목록을 조회합니다.
     * @param userId
     */
    @Get("{userId}/restaurant")
    @TsoaResponse<ApiResponse<UserRestaurantMissionDTO[]>>(200, "유저-식당미션조회성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 유저")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    public async handleGetUserRestaurantMission(
        @Path() userId: number,
    ): Promise<ApiResponse<UserRestaurantMissionDTO[]>> {
        try {
            const missions = await getUserRestaurantMission(userId);
            return success(missions);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }

    /**
     * 유저 - 도전중인 미션 목록 확인 API
     * @summary 특정 유저의 도전중인 미션 목록을 조회합니다.
     * @param userId
     */

    @TsoaResponse<ApiResponse<ActiveUserMissionDTO[]>>(200, "유저-도전중인 미션 목록 확인")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 유저")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    @Get("{userId}/active")
    public async handleGetActiveUserMissions(
        @Path() userId: number,
    ): Promise<ApiResponse<ActiveUserMissionDTO[]>> {
        try {
            const missions = await getActiveUserMission(userId);
            return success(missions);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }

    /**
     * 유저 미션 완료 처리 API
     * @summary 도전중인 미션을 완료 처리합니다.
     */
    @TsoaResponse<ApiResponse<null>>(204, "미션 완료 처리 성공")
    @TsoaResponse<ApiResponse<null>>(404, "존재하지 않는 유저미션")
    @TsoaResponse<ApiResponse<null>>(400, "완료 불가능한 미션 상태")
    @TsoaResponse<ApiResponse<null>>(500, "알수없는오류")
    @Patch("{userMissionId}/complete")
    public async handleCompleteUserMission(
        @Path() userMissionId: number,
    ): Promise<ApiResponse<null>> {
        try {
            await completeUserMission(userMissionId);
            return success(null);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }
}
