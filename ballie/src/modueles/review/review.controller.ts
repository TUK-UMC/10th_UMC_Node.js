import { Body, Controller, Example, Middlewares, Path, Post, Request, Response, Route, Tags } from "tsoa";
import { ReviewCreateRequest, ReviewCreateResponse } from "./review.dto.js";
import { reviewAdd } from "./review.service.js";
import { ApiResponse, success } from "../../common/response/response.js";
import { AppError } from "../../common/error/app.error.js";
import { InternalServerException } from "../../common/error/error.js";
import { jwtAuth } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import {
  ErrorResponse,
  reviewCreateRequestExample,
  reviewCreateResponseExample,
  unauthorizedError,
  restaurantNotFoundError,
  internalServerError,
} from "./review.swagger.js";

@Route("review")
@Tags("review")
export class ReviewController extends Controller {
  /**
   * 리뷰 등록 API
   * @summary 특정 식당에 리뷰를 등록합니다. JWT 토큰 필요
   */
  @Post("{restaurantId}")
  @Middlewares(jwtAuth())
  @Example<ReviewCreateRequest>(reviewCreateRequestExample)
  @Response<ApiResponse<ReviewCreateResponse>>(201, "리뷰 등록 성공", reviewCreateResponseExample)
  @Response<ErrorResponse>(401, "인증되지 않은 사용자", unauthorizedError)
  @Response<ErrorResponse>(404, "존재하지 않는 식당", restaurantNotFoundError)
  @Response<ErrorResponse>(500, "서버 내부 오류", internalServerError)
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
      throw new InternalServerException("알 수 없는 오류가 발생했습니다");
    }
  }
}
