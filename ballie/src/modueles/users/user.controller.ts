import { UpdateProfileRequest, UpdateProfileResponse, UserProfileResponse } from "./user.dto.js";
import { getProfile, updateProfile } from "./user.service.js";
import { Body, Controller, Example, Get, Middlewares, Patch, Path, Request, Response, Route, Tags } from "tsoa";
import { jwtAuth } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../common/response/response.js";
import { getUserReviews } from "../review/review.service.js";
import { reviewInfoDTO } from "../review/review.dto.js";
import { AppError } from "../../common/error/app.error.js";
import { InternalServerException } from "../../common/error/error.js";
import {
  ErrorResponse,
  getUserProfileExample,
  updateProfileResponseExample,
  getUserReviewsExample,
  unauthorizedError,
  userNotFoundError,
  internalServerError,
} from "./user.swagger.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 내 프로필 조회
   */
  @Get("myprofile")
  @Middlewares(jwtAuth())
  @Example<ApiResponse<UserProfileResponse>>(getUserProfileExample)
  @Response<ErrorResponse>(401, "인증되지 않은 사용자", unauthorizedError)
  @Response<ErrorResponse>(404, "사용자를 찾을 수 없음", userNotFoundError)
  @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
  public async handleGetProfile(
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<UserProfileResponse>> {
    try {
      const userId = (req.user as Express.User).userId!;
      const result = await getProfile(userId);
      return success(result);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerException("알 수 없는 오류가 발생했습니다");
    }
  }

  /**
   * 내 프로필 수정
   */
  @Patch("myprofile")
  @Middlewares(jwtAuth())
  @Example<ApiResponse<UpdateProfileResponse>>(updateProfileResponseExample)
  @Response<ErrorResponse>(401, "인증되지 않은 사용자", unauthorizedError)
  @Response<ErrorResponse>(400, "잘못된 요청 형식입니다")
  @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
  public async handleUpdateProfile(
    @Request() req: ExpressRequest,
    @Body() body: UpdateProfileRequest,
  ): Promise<ApiResponse<UpdateProfileResponse>> {
    try {
      const userId = (req.user as Express.User).userId!;
      const result = await updateProfile(userId, body);
      return success(result);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerException("알 수 없는 오류가 발생했습니다");
    }
  }

  /**
   * 유저 리뷰 목록 조회
   */
  @Get("{userId}/reviews")
  @Example<ApiResponse<reviewInfoDTO[]>>(getUserReviewsExample)
  @Response<ErrorResponse>(404, "사용자를 찾을 수 없음", userNotFoundError)
  @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
  public async handleGetUserReviews(
    @Path() userId: number,
  ): Promise<ApiResponse<reviewInfoDTO[]>> {
    try {
      const reviews = await getUserReviews(userId);
      return success(reviews);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new InternalServerException("알 수 없는 오류가 발생했습니다");
    }
  }
}
