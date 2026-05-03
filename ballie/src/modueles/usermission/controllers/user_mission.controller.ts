import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userMissionStartRequest } from "../dtos/userMission.dto.js";
import { userMissionAdd, getUserRestaurantMission, getActiveUserMission, completeUserMission } from "../services/user_mission.service.js";

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

export const handleGetUserRestaurantMission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const missions = await getUserRestaurantMission(userId);
        res.status(StatusCodes.OK).json({ result: missions });
    } catch (err) {
        next(err);
    }
};

export const handleGetActiveUserMissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const missions = await getActiveUserMission(userId);
        res.status(StatusCodes.OK).json({ result: missions });
    } catch (err) {
        next(err);
    }
};

export const handleCompleteUserMission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userMissionId = Number(req.params.userMissionId);
        const result = await completeUserMission(userMissionId);
        res.status(StatusCodes.OK).json({ result });
    } catch (err: any) {
        if (err.statusCode === 400) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        } else {
            next(err);
        }
    }
};
