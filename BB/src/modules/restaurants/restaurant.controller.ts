import { Response, SuccessResponse, Query, Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import {
    createMissionService,
    createReviewService,
    listRestaurantMissionsService,
    listRestaurantReviewsService,
} from "./restaurant.service.js";
import { CreateReviewDto, MissionListResponse, ReviewListResponse } from "./restaurant.dto.js";
import { ApiResponse, success } from "../../common/responses/response.js";

interface CreateMissionDto {
    name: string;
    price: number | null;
    point: number | null;
}

@Route("restaurants")
@Tags("Restaurants")
export class RestaurantController extends Controller {
    /**
    * 리뷰 작성 API
    * @summary 사용자가 음식점에 리뷰를 작성하는 엔드포인트입니다.
    */
    @Post("{restaurantId}/reviews")
    @SuccessResponse(201, "리뷰 작성 성공")
    @Response<ApiResponse<null>>(409, "이미 작성된 리뷰 에러")
    public async createReview(
        @Path() restaurantId: number,
        @Body() body: CreateReviewDto
    ): Promise<ApiResponse<ReviewListResponse>> {
        const result = await createReviewService(restaurantId, body);

        return success(result);
    }

    @Post("{restaurantId}/missions")
    @SuccessResponse(201, "미션 생성 성공")
    public async createMission(
        @Path() restaurantId: number,
        @Body() body: CreateMissionDto
    ): Promise<ApiResponse<MissionListResponse>> {
        const result = await createMissionService(
            restaurantId,
            body.name,
            body.price,
            body.point
        );

        return success({
            data: [{
                id: result.missionId,
                restaurantId: result.restaurantId,
                price: result.price,
                point: result.point,
            }],
            pagination: { cursor: null },
        });
    }

    @Get("{restaurantId}/reviews")
    @SuccessResponse(200, "리뷰 목록 조회 성공")
    public async listRestaurantReviews(
        @Path() restaurantId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<ReviewListResponse>> {
        const reviews = await listRestaurantReviewsService(restaurantId, cursor);

        return success(reviews);
    }

    @Get("{restaurantId}/missions")
    @SuccessResponse(200, "미션 목록 조회 성공")
    public async listRestaurantMissions(
        @Path() restaurantId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<MissionListResponse>> {
        const missions = await listRestaurantMissionsService(restaurantId, cursor);

        return success(missions);
    }
}