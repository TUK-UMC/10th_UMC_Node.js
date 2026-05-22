import { Request as ExpressRequest, Response, NextFunction } from "express";
import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
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
}

export const listRestaurantReviews = async (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurantId = parseId(req.params.restaurantId);
        const cursor = typeof req.query.cursor === "string"
            ? parseInt(req.query.cursor, 10)
            : 0;

        const reviews = await listRestaurantReviewsService(restaurantId, cursor);

        res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
        next(err);
    }
};

export const listRestaurantMissions = async (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurantId = parseId(req.params.restaurantId);
        const cursor = typeof req.query.cursor === "string"
            ? parseInt(req.query.cursor, 10)
            : 0;

        const missions = await listRestaurantMissionsService(restaurantId, cursor);

        res.status(StatusCodes.OK).json(missions);
    } catch (err) {
        next(err);
    }
};

export const createReview = async (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurantId = parseId(req.params.restaurantId);
        const result = await createReviewService(restaurantId, req.body);
        res.status(StatusCodes.OK).json(success(result));
    } catch (err) {
        next(err);
    }
};

export const createMission = async (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurantId = parseId(req.params.restaurantId);
        const { name, price, point } = req.body as CreateMissionDto;
        const result = await createMissionService(restaurantId, name, price, point);

        res.status(StatusCodes.OK).json(success({
            data: [{
                id: result.missionId,
                restaurantId: result.restaurantId,
                price: result.price,
                point: result.point,
            }],
            pagination: { cursor: null },
        }));
    } catch (err) {
        next(err);
    }
};
