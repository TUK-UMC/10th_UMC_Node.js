import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, MissionRestaurantCreateRequest } from "../dtos/mission.dto.js";
import { restaurantMissionAdd } from "../servives/mission.service.js";

export const handleMissionAdd = async (req: Request, res: Response, next: NextFunction) => {
    const mission = await restaurantMissionAdd(bodyToMission(req.body as MissionRestaurantCreateRequest));
    res.status(StatusCodes.OK).json({ result: mission });
};
