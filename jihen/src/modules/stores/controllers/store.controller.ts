import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { type AddStoreRequest, type AddReviewRequest, type AddMissionRequest, type ChallengeMissionRequest } from "../dtos/store.dto.js";
import { createStore, createReview, createMission, startMissionChallenge, getStoreMissions, getMyOngoingMissions, finishMission, listStoreReviews } from "../services/store.service.js";

export const handleAddStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createStore(req.body as AddStoreRequest);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) { next(err); }
};

export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = Number(req.params["storeId"]);
    const result = await createReview(storeId, req.body as AddReviewRequest);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) { next(err); }
};

export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = Number(req.params["storeId"]);
    const result = await createMission(storeId, req.body as AddMissionRequest);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) { next(err); }
};

export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const missionId = Number(req.params["missionId"]);
    const result = await startMissionChallenge(missionId, req.body as ChallengeMissionRequest);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) { next(err); }
};

// ③ 특정 가게의 미션 목록
export const handleGetStoreMissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = Number(req.params["storeId"]);
    const result = await getStoreMissions(storeId);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) { next(err); }
};

// ④ 내가 진행 중인 미션 목록
export const handleGetMyMissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const memberId = Number(req.params["memberId"]);
    const result = await getMyOngoingMissions(memberId);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) { next(err); }
};

// ⑤ 미션 완료 처리
export const handleCompleteMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const memberMissionId = Number(req.params["memberMissionId"]);
    const result = await finishMission(memberMissionId);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) { next(err); }
};

// 가게 리뷰 목록 (커서 페이지네이션)
export const handleListStoreReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = parseInt(req.params["storeId"] as string, 10);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor, 10) : 0;
    const result = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(result);
  } catch (err) { next(err); }
};
