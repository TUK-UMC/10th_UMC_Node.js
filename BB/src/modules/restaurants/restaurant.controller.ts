import { Request as ExpressRequest, Response, NextFunction } from "express";
import { Query, Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { StatusCodes } from "http-status-codes";
import {
    createMissionService,
    createReviewService,
    listRestaurantMissionsService,
    listRestaurantReviewsService,
} from "./restaurant.service.js";
import { parseId } from "../../utils/parse.js";
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
    @Post("{restaurantId}/reviews")
    public async createReview(
        @Path() restaurantId: number,
        @Body() body: CreateReviewDto
    ): Promise<ApiResponse<ReviewListResponse>> {
        const result = await createReviewService(restaurantId, body);

        return success(result);
    }

    @Post("{restaurantId}/missions")
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
    public async listRestaurantReviews(
        @Path() restaurantId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<ReviewListResponse>> {
        const reviews = await listRestaurantReviewsService(restaurantId, cursor);

        return success(reviews);
    }

    @Get("{restaurantId}/missions")
    public async listRestaurantMissions(
        @Path() restaurantId: number,
        @Query() cursor: number = 0
    ): Promise<ApiResponse<MissionListResponse>> {
        const missions = await listRestaurantMissionsService(restaurantId, cursor);

        return success(missions);
    }
}