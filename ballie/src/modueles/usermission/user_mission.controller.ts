import { Controller, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { UserMissionStartResponse, UserRestaurantMissionDTO, ActiveUserMissionDTO, CompleteUserMissionDTO } from "./userMission.dto.js";
import { userMissionAdd, getUserRestaurantMission, getActiveUserMission, completeUserMission } from "./user_mission.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";

@Route("userMissions")
@Tags("userMissions")
export class UserMissionController extends Controller {
    @Post("{userId}/mission/{missionId}")
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

    @Get("{userId}/restaurant")
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

    @Patch("{userMissionId}/complete")
    public async handleCompleteUserMission(
        @Path() userMissionId: number,
    ): Promise<ApiResponse<CompleteUserMissionDTO>> {
        try {
            const result = await completeUserMission(userMissionId);
            return success(result);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }
}
