import { UserSignUpRequest, userSignUpResponse } from "./user.dto.js";
import { userSignUp } from "./user.service.js";
import { Body, Controller, Get, Middlewares, Path, Post, Request, Route, Tags } from "tsoa";
import { authorizeUser } from "../../common/middlewares/auth.middleware";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../common/response/response";
import { getUserReviews } from "../review/review.service.js";
import { reviewInfoDTO } from "../review/review.dto.js";
import { AppError } from "../../common/error/app.error.js";
import { Response as TsoaResponse } from "tsoa";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
    /**
     * 회원가입 API
     * @summary 회원가입을 처리하는 엔드포인트입니다.
     */
    @Post("signup")
    @TsoaResponse<ApiResponse<userSignUpResponse>>(201, "회원가입 성공")
    @TsoaResponse<ApiResponse<null>>(409, "중복된 이메일 에러")
    @TsoaResponse<ApiResponse<null>>(500, "알수 없는 오류")

    public async handleUserSignUp(
        @Body() body: UserSignUpRequest,
    ): Promise<ApiResponse<userSignUpResponse>> {
        try {
            const user = await userSignUp(body);
            return success(user);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }

    /**
     * 유저가 남긴 리뷰 확인하는 API
     * @summary 특정 유저의 리뷰 목록을 조회합니다.
     * @param userId
     */
    @Get("{userId}/reviews")
    @TsoaResponse<ApiResponse<reviewInfoDTO[]>>(200,"리뷰 불러오기 성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 유저")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    public async handleGetUserReviews(
        @Path() userId: number,
    ): Promise<ApiResponse<reviewInfoDTO[]>> {
        try {
            const reviews = await getUserReviews(userId);
            return success(reviews);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }
}
