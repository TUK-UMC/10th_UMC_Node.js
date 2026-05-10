import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
import { ReviewCreateRequest, ReviewCreateResponse } from "./review.dto.js";
import { reviewAdd } from "./review.service.js";
import { ApiResponse, success } from "../../common/response/response";
import { AppError } from "../../common/error/app.error.js";

@Route("review")
@Tags("review")
export class ReviewController extends Controller {
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
