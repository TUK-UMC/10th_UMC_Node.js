import { Controller, Get, Middlewares, Patch, Path, Post, Request, Route, Tags } from "tsoa";
import { UserMissionStartResponse, UserRestaurantMissionDTO, ActiveUserMissionDTO } from "./userMission.dto.js";
import { userMissionAdd, getUserRestaurantMission, getActiveUserMission, completeUserMission } from "./user_mission.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";
import { Response as TsoaResponse } from "tsoa";
import { jwtAuth } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";

@Route("userMissions")
@Tags("userMissions")
export class UserMissionController extends Controller {

    /**
     * 유저 - 미션 등록 API
     * @summary 미션을 도전합니다. JWT 토큰 필요
     */
    @Post("mission/{missionId}")
    @Middlewares(jwtAuth())
    @TsoaResponse<ApiResponse<UserMissionStartResponse>>(201, "유저-미션 추가 성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 유저")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 미션")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    public async handleUserMissionAdd(
        @Path() missionId: number,
        @Request() req: ExpressRequest,
    ): Promise<ApiResponse<UserMissionStartResponse>> {
        try {
            const userId = Number((req.user as Express.User).userId!);
            const userMission = await userMissionAdd(userId, missionId);
            return success(userMission);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }

    /**
     * 유저의 식당 미션 목록 조회 API
     * @summary 내 식당 미션 목록을 조회합니다. JWT 토큰 필요
     */
    @Get("restaurant")
    @Middlewares(jwtAuth())
    @TsoaResponse<ApiResponse<UserRestaurantMissionDTO[]>>(200, "유저-식당미션조회성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 유저")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    public async handleGetUserRestaurantMission(
        @Request() req: ExpressRequest,
    ): Promise<ApiResponse<UserRestaurantMissionDTO[]>> {
        try {
            const userId = Number((req.user as Express.User).userId!);
            const missions = await getUserRestaurantMission(userId);
            return success(missions);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }

    /**
     * 유저 - 도전중인 미션 목록 확인 API
     * @summary 내 도전중인 미션 목록을 조회합니다. JWT 토큰 필요
     */
    @Get("active")
    @Middlewares(jwtAuth())
    @TsoaResponse<ApiResponse<ActiveUserMissionDTO[]>>(200, "유저-도전중인 미션 목록 확인")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 유저")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    public async handleGetActiveUserMissions(
        @Request() req: ExpressRequest,
    ): Promise<ApiResponse<ActiveUserMissionDTO[]>> {
        try {
            const userId = Number((req.user as Express.User).userId!);
            const missions = await getActiveUserMission(userId);
            return success(missions);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }

    /**
     * 유저 미션 완료 처리 API
     * @summary 도전중인 미션을 완료 처리합니다. JWT 토큰 필요
     */
    @Patch("{userMissionId}/complete")
    @Middlewares(jwtAuth())
    @TsoaResponse<ApiResponse<null>>(204, "미션 완료 처리 성공")
    @TsoaResponse<ApiResponse<null>>(404, "존재하지 않는 유저미션")
    @TsoaResponse<ApiResponse<null>>(400, "완료 불가능한 미션 상태")
    @TsoaResponse<ApiResponse<null>>(500, "알수없는오류")
    public async handleCompleteUserMission(
        @Path() userMissionId: number,
        @Request() req: ExpressRequest,
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
