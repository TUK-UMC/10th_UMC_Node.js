import { Controller, Example, Get, Middlewares, Patch, Path, Post, Request, Response, Route, Tags } from "tsoa";
import { UserMissionStartResponse, UserRestaurantMissionDTO, ActiveUserMissionDTO } from "./userMission.dto.js";
import { userMissionAdd, getUserRestaurantMission, getActiveUserMission, completeUserMission } from "./user_mission.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";
import { InternalServerException } from "../../common/error/error.js";
import { jwtAuth } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import {
    ErrorResponse,
    userMissionStartResponseExample,
    userRestaurantMissionsExample,
    activeUserMissionsExample,
    unauthorizedError,
    userNotFoundError,
    missionNotFoundError,
    userMissionNotFoundError,
    invalidMissionStatusError,
    internalServerError,
} from "./user_mission.swagger.js";

@Route("userMissions")
@Tags("userMissions")
export class UserMissionController extends Controller {

    /**
     * 미션 도전 등록 API
     * @summary 미션을 도전합니다. JWT 토큰 필요
     */
    @Post("mission/{missionId}")
    @Middlewares(jwtAuth())
    @Response<ApiResponse<UserMissionStartResponse>>(201, "유저-미션 추가 성공", userMissionStartResponseExample)
    @Response<ErrorResponse>(401, "인증되지 않은 사용자", unauthorizedError)
    @Response<ErrorResponse>(404, "존재하지 않는 유저", userNotFoundError)
    @Response<ErrorResponse>(404, "존재하지 않는 미션", missionNotFoundError)
    @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
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
            throw new InternalServerException("알 수 없는 오류가 발생했습니다");
        }
    }

    /**
     * 내 식당 미션 목록 조회 API
     * @summary 내 식당 미션 목록을 조회합니다. JWT 토큰 필요
     */
    @Get("restaurant")
    @Middlewares(jwtAuth())
    @Example<ApiResponse<UserRestaurantMissionDTO[]>>(userRestaurantMissionsExample)
    @Response<ErrorResponse>(401, "인증되지 않은 사용자", unauthorizedError)
    @Response<ErrorResponse>(404, "존재하지 않는 유저", userNotFoundError)
    @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
    public async handleGetUserRestaurantMission(
        @Request() req: ExpressRequest,
    ): Promise<ApiResponse<UserRestaurantMissionDTO[]>> {
        try {
            const userId = Number((req.user as Express.User).userId!);
            const missions = await getUserRestaurantMission(userId);
            return success(missions);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new InternalServerException("알 수 없는 오류가 발생했습니다");
        }
    }

    /**
     * 도전중인 미션 목록 조회 API
     * @summary 내 도전중인 미션 목록을 조회합니다. JWT 토큰 필요
     */
    @Get("active")
    @Middlewares(jwtAuth())
    @Example<ApiResponse<ActiveUserMissionDTO[]>>(activeUserMissionsExample)
    @Response<ErrorResponse>(401, "인증되지 않은 사용자", unauthorizedError)
    @Response<ErrorResponse>(404, "존재하지 않는 유저", userNotFoundError)
    @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
    public async handleGetActiveUserMissions(
        @Request() req: ExpressRequest,
    ): Promise<ApiResponse<ActiveUserMissionDTO[]>> {
        try {
            const userId = Number((req.user as Express.User).userId!);
            const missions = await getActiveUserMission(userId);
            return success(missions);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new InternalServerException("알 수 없는 오류가 발생했습니다");
        }
    }

    /**
     * 미션 완료 처리 API
     * @summary 도전중인 미션을 완료 처리합니다. JWT 토큰 필요
     */
    @Patch("{userMissionId}/complete")
    @Middlewares(jwtAuth())
    @Response<ApiResponse<null>>(204, "미션 완료 처리 성공")
    @Response<ErrorResponse>(401, "인증되지 않은 사용자", unauthorizedError)
    @Response<ErrorResponse>(404, "존재하지 않는 유저-미션", userMissionNotFoundError)
    @Response<ErrorResponse>(400, "완료 불가능한 미션 상태", invalidMissionStatusError)
    @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
    public async handleCompleteUserMission(
        @Path() userMissionId: number,
        @Request() req: ExpressRequest,
    ): Promise<ApiResponse<null>> {
        try {
            await completeUserMission(userMissionId);
            return success(null);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new InternalServerException("알 수 없는 오류가 발생했습니다");
        }
    }
}
