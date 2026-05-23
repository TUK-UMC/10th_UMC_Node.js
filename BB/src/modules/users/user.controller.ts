import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { Body, Controller, Post, Route, Tags, Path, Get, Query, Request, Middlewares, Res, Response } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest, UserSignUpResponse, ChallengeMissionRequest, ChallengeMissionResponse, UserMissionListResponse, UserReviewListResponse } from "./user.dto.js";
import { userSignUp, challengeMissionService, listUserReviewsService, listUserMissionsService } from "./user.service.js";
import { authorizeUser } from "../../common/middlewares/auth.middleware.js";
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
            body
        );

        const response: ChallengeMissionResponse = {
            missionId: result.missionId,
            status: result.status
        };

        this.setStatus(StatusCodes.OK);

        return success(response);
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



    @Get("guest")
    public async handleGuestPage(): Promise<String> {
        return `
            <h1>게스트 페이지</h1>
            <p>이 페이지는 로그인이 필요 없습니다.</p>
            <ul>
                <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
            </ul>
        `;
    }
    @Get("login")
    public async handleLoginPage(): Promise<String> {
        return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
    }
    @Get("mypage")
    @Middlewares(authorizeUser())
    public async handleMypage(@Request() req: ExpressRequest): Promise<String> {
        return `
            <h1>마이페이지</h1>
            <p>환영합니다, ${req.cookies.username}님!</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
        `;
    }
    @Get("set-login")
    public async handleSetLogin(@Request() req: ExpressRequest): Promise<String> {
        req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });
        return '로그인 쿠키(username=UMC9th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
    }
    @Get("set-logout")
    public async handleSetLogout(
        @Request() req: ExpressRequest,
    ): Promise<String> {
        req.res!.clearCookie("username");
        return '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>';
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
}; */
