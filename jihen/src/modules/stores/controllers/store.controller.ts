import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { type AddStoreRequest, type AddReviewRequest, type AddMissionRequest, type ChallengeMissionRequest } from "../dtos/store.dto.js";
import { createStore, createReview, createMission, startMissionChallenge } from "../services/store.service.js";

export const handleAddStore = async (req: Request, res: Response, next: NextFunction) => {
  const result = await createStore(req.body as AddStoreRequest);
  res.status(StatusCodes.CREATED).json({ result });
};

export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  const storeId = Number(req.params["storeId"]);
  const result = await createReview(storeId, req.body as AddReviewRequest);
  res.status(StatusCodes.CREATED).json({ result });
};

export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  const storeId = Number(req.params["storeId"]);
  const result = await createMission(storeId, req.body as AddMissionRequest);
  res.status(StatusCodes.CREATED).json({ result });
};

export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  const missionId = Number(req.params["missionId"]);
  const result = await startMissionChallenge(missionId, req.body as ChallengeMissionRequest);
  res.status(StatusCodes.CREATED).json({ result });
};
