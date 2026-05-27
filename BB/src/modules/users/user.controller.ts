import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { Body, Controller, Post, Route, Tags, Path, Get, Query, Request, Middlewares, Res, Response, SuccessResponse } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest, UserSignUpResponse, ChallengeMissionRequest, ChallengeMissionResponse, UserMissionListResponse, UserReviewListResponse } from "./user.dto.js";
import { userSignUp, challengeMissionService, listUserReviewsService, listUserMissionsService, userInfoUpdate } from "./user.service.js";
import { ApiResponse, success } from "../../common/responses/response.js";
import { isLogin } from "../../common/middlewares/auth.middleware.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
    /**
    * 회원가입 API
    * @summary 회원가입을 처리하는 엔드포인트입니다.
    */
    @Post("signup")
    @SuccessResponse(201, "회원가입 성공")
    @Response<ApiResponse<null>>(400, "중복된 이메일 에러")
    public async handleUserSignUp(
        @Body() body: UserSignUpRequest
    ): Promise<ApiResponse<UserSignUpResponse>> {
        const user = await userSignUp(body);
        return success(user);
    }

    /**
    * 정보수정 API
    * @summary 정보를 수정하는 엔드포인트입니다.
    */
    @Post("{userId}/profile")
    @Middlewares(
        isLogin
    )
    @SuccessResponse(200, "정보수정 성공")
    @Response<ApiResponse<null>>(400, "잘못된 요청")
    public async handleUserInfoUpdate(
        @Path() userId: number,
        @Body() body: UserSignUpRequest
    ): Promise<ApiResponse<UserSignUpResponse>> {
        const user = await userInfoUpdate(userId, body);
        return success(user);
    }

    /**
   * 미션 도전 API
   * @summary 유저가 미션을 도전하는 엔드포인트입니다.
   */
    @Post("{userId}/missions/challenge")
    @Middlewares(
        isLogin
    )
    @SuccessResponse(201, "유저 미션 도전 성공")
    @Response<null>(404, "USER_OR_MISSION_OR_RESTAURANT_NOT_EXIST")
    @Response<null>(409, "MISSION_ALREADY_ONGOING")
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


    /**
   * 미션조회 API
   * @summary 유저의 미션 목록을 조회하는 엔드포인트입니다.
   */
    @Get("{userId}/missions")
    @Middlewares(
        isLogin
    )
    @SuccessResponse(200, "유저의 미션 목록 조회 성공")
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

    /**
   * 리뷰 조회 API
   * @summary 유저가 작성한 리뷰 목록을 조회하는 엔드포인트입니다.
   */
    @Get("{userId}/reviews")
    @Middlewares(
        isLogin
    )
    @SuccessResponse(200, "유저의 리뷰 목록 조회 성공")
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