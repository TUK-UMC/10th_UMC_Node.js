import { type AddStoreRequest, type AddReviewRequest, type AddMissionRequest, type ChallengeMissionRequest } from "../dtos/store.dto.js";
import {
  addStore,
  getStoreById,
  addReview,
  addMission,
  getMissionById,
  getChallengingMission,
  challengeMission,
} from "../repositories/store.repository.js";

export const createStore = async (data: AddStoreRequest) => {
  const storeId = await addStore(data);
  return { storeId };
};

export const createReview = async (storeId: number, data: AddReviewRequest) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }
  const reviewId = await addReview(storeId, data);
  return { reviewId };
};

export const createMission = async (storeId: number, data: AddMissionRequest) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }
  const missionId = await addMission(storeId, data);
  return { missionId };
};

export const startMissionChallenge = async (missionId: number, data: ChallengeMissionRequest) => {
  const mission = await getMissionById(missionId);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  const existing = await getChallengingMission(data.memberId, missionId);
  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const challengeId = await challengeMission(data.memberId, missionId);
  return { challengeId };
};
