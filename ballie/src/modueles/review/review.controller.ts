import { Body, Controller, Middlewares, Path, Post, Request, Route, Tags } from "tsoa";
import { ReviewCreateRequest, ReviewCreateResponse } from "./review.dto.js";
import { reviewAdd } from "./review.service.js";
import { ApiResponse, success } from "../../common/response/response.js";
import { AppError } from "../../common/error/app.error.js";
import { jwtAuth } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";

@Route("review")
@Tags("review")
export class ReviewController extends Controller {
  /**
   * 리뷰 등록 API
   * @summary 특정 식당에 리뷰를 등록합니다. JWT 토큰 필요
   */
  @Post("{restaurantId}")
  @Middlewares(jwtAuth())
  public async handleReviewAdd(
    @Path() restaurantId: number,
    @Body() body: ReviewCreateRequest,
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<ReviewCreateResponse>> {
    try {
      const userId = Number((req.user as Express.User).userId!);
      const review = await reviewAdd(userId, body, restaurantId);
      this.setStatus(201);
      return success(review);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
    }
  }
}
