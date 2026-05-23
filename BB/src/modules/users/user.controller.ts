import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { Body, Controller, Post, Route, Tags, Path, Get, Query, Request, Middlewares, Res, Response } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest, UserSignUpResponse, ChallengeMissionRequest, ChallengeMissionResponse, UserMissionListResponse, UserReviewListResponse } from "./user.dto.js";
import { userSignUp, challengeMissionService, listUserReviewsService, listUserMissionsService } from "./user.service.js";
import { ApiResponse, success } from "../../common/responses/response.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
    @Post("signup")
    @Response<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
    @Response<ApiResponse<null>>(400, "중복된 이메일 에러")
    public async handleUserSignUp(
        @Body() body: UserSignUpRequest
    ): Promise<ApiResponse<UserSignUpResponse>> {
        const user = await userSignUp(body);
        return success(user);
    }

    // 미션 도전
    @Post("{userId}/missions/challenge")
    public async challengeMission(
        @Path() userId: number,
        @Body() body: ChallengeMissionRequest
    ): Promise<ApiResponse<ChallengeMissionResponse>> {

        const result = await challengeMissionService(
            userId,
            body
        );

        return success(result);
    }


    // 진행 중인 미션 목록 조회
    @Get("{userId}/missions")
    public async listUserMissions(
        @Path() userId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<UserMissionListResponse>> {
        const missions = await listUserMissionsService(
            userId,
            cursor
        );

        this.setStatus(StatusCodes.OK);

        return success(missions);
    }

    // 내가 작성한 리뷰 목록 조회
    @Get("{userId}/reviews")
    public async listUserReviews(
        @Path() userId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<UserReviewListResponse>> {
        const reviews = await listUserReviewsService(
            userId,
            cursor
        );

        this.setStatus(StatusCodes.OK);

        return success(reviews);
    }
}

/*
export const challengeMission = async (req: Request, res: Response) => {
    try {
        const userId = parseId(req.params.userId);
        const missionId = Number(req.body.missionId);

        const result = await challengeMissionService(userId, missionId);

        return res.json({
            success: true,
            code: "S200",
            message: "미션 도전 요청 성공",
            data: [{
                ...result,
                missionId: result.missionId,
            }]
        });

    } catch (err: any) {
        if (err.message === "MISSION_ALREADY_ONGOING") {
            return res.status(400).json({
                success: false,
                code: "MISSION_ALREADY_ONGOING",
                message: "이미 미션을 등록했습니다.",
                data: null
            });
        }

        return res.status(500).json({
            success: false,
            code: "E500",
            message: `서버 에러: ${err.message}`,
            data: null
        });
    }
};

export const listUserMissions = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = parseId(req.params.userId);
        const cursor =
            typeof req.query.cursor === "string"
                ? parseInt(req.query.cursor, 10)
                : 0;

        const missions = await listUserMissionsService(userId, cursor);

        res.status(StatusCodes.OK).json(missions);
    } catch (err) {
        next(err);
    }
};

export const listUserReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = parseId(req.params.userId);
        const cursor =
            typeof req.query.cursor === "string"
                ? parseInt(req.query.cursor, 10)
                : 0;

        const reviews = await listUserReviewsService(userId, cursor);

        res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
        next(err);
    }
};
*/