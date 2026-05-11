import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant, RestaurantCreateRequest } from "../dtos/restaurant.dto.js";
import { restaurantAdd } from "../sevices/restaurant.service.js";

export const handleRestaurantAdd = async (req: Request, res: Response, next: NextFunction) => {
    const restaurant = await restaurantAdd(bodyToRestaurant(req.body as RestaurantCreateRequest));
    res.status(StatusCodes.OK).json({ result: restaurant });
};
