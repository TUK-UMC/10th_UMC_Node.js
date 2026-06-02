import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
import { ReviewCreateRequest, ReviewCreateResponse } from "./review.dto.js";
import { reviewAdd } from "./review.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";
import { Response as TsoaResponse } from "tsoa";


@Route("review")
@Tags("review")
export class ReviewController extends Controller {
    /**
     * 리뷰 등록 API
     * @summary 특정 식당에 리뷰를 등록합니다.
     * @param restaurantId
     * @param body
     */
    @TsoaResponse<ApiResponse<ReviewCreateResponse>>(201, "리뷰등록 성공")
    @TsoaResponse<ApiResponse<null>>(404,"존재하지 않는 식당")
    @TsoaResponse<ApiResponse<null>>(500,"알수없는오류")
    @Post("{restaurantId}")
    public async handleReviewAdd(
        @Path() restaurantId: number,
        @Body() body: ReviewCreateRequest,
    ): Promise<ApiResponse<ReviewCreateResponse>> {
        try {
            const review = await reviewAdd(body, restaurantId);
            return success(review);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "알 수 없는 오류가 발생했습니다" });
        }
    }
}
