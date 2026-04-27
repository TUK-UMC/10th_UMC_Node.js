import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ReviewCreateRequest } from "../dtos/review.dots.js";
import { reviewAdd } from "../services/review.service.js";

export const handleReviewAdd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await reviewAdd(req.body as ReviewCreateRequest);
        res.status(StatusCodes.OK).json({ result: review });
    } catch (err: any) {
        if (err.statusCode === 404) {
            res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
        } else {
            next(err);
        }
    }
};
