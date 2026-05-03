import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, MissionRestaurantCreateRequest } from "../dtos/mission.dto.js";
import { restaurantMissionAdd, getRestaurantMissions } from "../servives/mission.service.js";

export const handleMissionAdd = async (req: Request, res: Response, next: NextFunction) => {
    const mission = await restaurantMissionAdd(bodyToMission(req.body as MissionRestaurantCreateRequest));
    res.status(StatusCodes.OK).json({ result: mission });
};

export const handleGetRestaurantMissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurantId = Number(req.params.restaurantId);
        const missions = await getRestaurantMissions(restaurantId);
        res.status(StatusCodes.OK).json({ result: missions });
    } catch (err) {
        next(err);
    }
};
