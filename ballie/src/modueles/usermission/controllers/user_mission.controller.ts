import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userMissionStartRequest } from "../dtos/userMission.dto.js";
import { userMissionAdd } from "../services/user_mission.service.js";

export const handleUserMissionAdd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userMission = await userMissionAdd(req.body as userMissionStartRequest);
        res.status(StatusCodes.OK).json({ result: userMission });
    } catch (err: any) {
        if (err.statusCode === 404) {
            res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
        } else {
            next(err);
        }
    }
};
