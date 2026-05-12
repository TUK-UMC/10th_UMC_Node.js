import { Request, Response, NextFunction } from "express";
import { createReviewService, createMissionService } from "./restaurant.service.js";
import { StatusCodes } from "http-status-codes";
import { listRestaurantReviewsService, listRestaurantMissionsService } from "./restaurant.service.js";
import { parseBigInt } from "../../utils/parse.js";

export const createReview = async (req: Request, res: Response) => {
    try {
        console.log("[createReview] request received", {
            method: req.method,
            originalUrl: req.originalUrl,
            params: req.params,
            body: req.body
        });

        const restaurantId = parseBigInt(req.params.restaurantId);
        const userId = BigInt(req.body.userId);
        const { content, star } = req.body;

        console.log("[createReview] parsed request data", {
            userId,
            restaurantId,
            content,
            star
        });

        await createReviewService(userId, restaurantId, content, star);

        return res.json({
            success: true,
            code: "S200",
            message: "리뷰 작성 성공",
            data: null
        });
    } catch (err: any) {
        console.error("[createReview] failed", {
            message: err?.message,
            stack: err?.stack,
            params: req.params,
            body: req.body
        });

        if (err.message === "REVIEW_ALREADY_EXISTS") {
            return res.status(400).json({
                success: false,
                code: "E401",
                message: "이미 리뷰를 작성했습니다.",
                data: null
            });
        }

        if (err.message === "RESTAURANT_NOT_EXIST") {
            return res.status(404).json({
                success: false,
                code: "RESTAURANT_NOT_EXIST",
                message: "존재하지 않는 식당입니다.",
                data: null
            });
        }

        if (err.message === "INVALID_USER_ID") {
            return res.status(400).json({
                success: false,
                code: "INVALID_USER_ID",
                message: "userId가 올바르지 않습니다.",
                data: null
            });
        }

        if (err.message === "INVALID_RESTAURANT_ID") {
            return res.status(400).json({
                success: false,
                code: "INVALID_RESTAURANT_ID",
                message: "restaurantId가 올바르지 않습니다.",
                data: null
            });
        }

        return res.status(500).json({
            success: false,
            code: "E500",
            message: "서버 에러",
            data: null
        });
    }
};

export const createMission = async (req: Request, res: Response) => {
    try {
        const restaurantId = parseBigInt(req.params.restaurantId);
        const { name, price, point } = req.body;

        const result = await createMissionService(
            restaurantId,
            name,
            price,
            point
        );

        return res.json({
            success: true,
            code: "S200",
            message: "가게 등록 성공",
            data: [{
                ...result,
                missionId: result.missionId.toString(),
                restaurantId: result.restaurantId.toString(),
            }]
        });

    } catch (err: any) {
        if (err.message === "RESTAURANT_NOT_EXIST") {
            return res.status(404).json({
                success: false,
                code: "RESTAURANT_NOT_EXIST",
                message: "존재하지 않는 식당입니다.",
                data: null
            });
        }

        return res.status(500).json({
            success: false,
            code: "E500",
            message: "서버 에러",
            data: null
        });
    }
};

export const listRestaurantReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurantId = parseBigInt(req.params.restaurantId);
        const cursor =
            typeof req.query.cursor === "string"
                ? parseInt(req.query.cursor, 10)
                : 0;

        const reviews = await listRestaurantReviewsService(restaurantId, cursor);

        res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
        next(err);
    }
};

export const listRestaurantMissions = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurantId = parseBigInt(req.params.restaurantId);
        const cursor =
            typeof req.query.cursor === "string"
                ? parseInt(req.query.cursor, 10)
                : 0;

        const missions = await listRestaurantMissionsService(restaurantId, cursor);

        res.status(StatusCodes.OK).json(missions);
    } catch (err) {
        next(err);
    }
};