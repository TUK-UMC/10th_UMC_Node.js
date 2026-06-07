import { UpdateProfileRequest, UpdateProfileResponse, UserProfileResponse } from "./user.dto.js";
import { getProfile, updateProfile } from "./user.service.js";
import { Body, Controller, Get, Middlewares, Patch, Path, Request, Route, Tags } from "tsoa";
import { jwtAuth } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../common/response/response.js";
import { getUserReviews } from "../review/review.service.js";
import { reviewInfoDTO } from "../review/review.dto.js";
import { AppError } from "../../common/error/app.error.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 내 프로필 조회
   */
  @Get("myprofile")
  @Middlewares(jwtAuth())
  public async handleGetProfile(
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<UserProfileResponse>> {
    try {
      const userId = (req.user as Express.User).userId!;
      const result = await getProfile(userId);
      return success(result);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
    }
  }


  @Patch("myprofile")
  @Middlewares(jwtAuth())
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
      throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
    }
  }

  /**
   * 유저 리뷰 목록 조회
   */
  @Get("{userId}/reviews")
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
