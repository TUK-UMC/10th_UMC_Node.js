import { type AddStoreRequest, type AddReviewRequest, type AddMissionRequest, type ChallengeMissionRequest } from "../dtos/store.dto.js";
import {
  addStore,
  getStoreById,
  addReview,
  addMission,
  getMissionById,
  getChallengingMission,
  challengeMission,
<<<<<<< feat/issue-30
  getMissionsByStoreId,
  getOngoingMissionsByMemberId,
  completeMemberMission,
  getAllStoreReviews,
} from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";
=======
} from "../repositories/store.repository.js";
>>>>>>> develop

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
<<<<<<< feat/issue-30

// ③ 특정 가게의 미션 목록
export const getStoreMissions = async (storeId: number) => {
  const store = await getStoreById(storeId);
  if (!store) throw new Error("존재하지 않는 가게입니다.");
  return await getMissionsByStoreId(storeId);
};

// ④ 내가 진행 중인 미션 목록
export const getMyOngoingMissions = async (memberId: number) => {
  return await getOngoingMissionsByMemberId(memberId);
};

// ⑤ 미션 완료 처리
export const finishMission = async (memberMissionId: number) => {
  return await completeMemberMission(memberMissionId);
};

// 가게 리뷰 목록 (커서 페이지네이션)
export const listStoreReviews = async (storeId: number, cursor: number) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};
=======
>>>>>>> develop
