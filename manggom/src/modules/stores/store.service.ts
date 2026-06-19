import type {
  StoreAddRequest,
  StoreAddResponse,
  ReviewAddRequest,
  ReviewAddResponse,
  ReviewItem,
  MissionAddRequest,
  MissionAddResponse,
  UserMissionAddResponse
} from "./store.dto.js";

import {
  addStore,
  getStore,
  addReview,
  getStoreReviews,
  addMission,
  getMission,
  getUserMission,
  addUserMission,
  getUserReviews,
  getStoreMissions,
  getUserMissions,
  completUserMission
} from "./store.repository.js";

import { storefindError, MissionUpdateError,DuplicateMissionError,NotFixMissionStatusError,AlreadyCompletedMissionError } from "../../common/errors/error.js";

// 가게 추가
export const storeAdd = async (data: StoreAddRequest): Promise<StoreAddResponse> => {
  const storeId = await addStore(data);
  return <StoreAddResponse>{ storeId };
};


// 리뷰 추가
export const reviewAdd = async (storeId: number, data: ReviewAddRequest): Promise<ReviewAddResponse> => {
  const store = await getStore(storeId);

  if (store == null) throw new storefindError("존재하지 않는 가게입니다.");

  const reviewId = await addReview(storeId, data);
  return <ReviewAddResponse>{ reviewId };
};

// 리뷰 목록 조회
export const listStoreReviews = async (storeId: number): Promise<ReviewItem[]> => {
  const store = await getStore(storeId);
  if (store == null) throw new storefindError("존재하지 않는 가게입니다.");
  return await getStoreReviews(storeId);
};

// 미션 추가
export const missionAdd = async (storeId: number, data: MissionAddRequest): Promise<MissionAddResponse> => {
  const store = await getStore(storeId);
  const mission = await addMission(storeId, data);
  if (store == null) throw new storefindError("존재하지 않는 가게입니다.");
  if (mission == null) throw new MissionUpdateError("미션이 추가가 되지 않았습니다.");
  const missionId = await addMission(storeId, data);
  return <MissionAddResponse>{ missionId };
};

// 미션 도전하기
export const userMissionAdd = async (userId: number, missionId: number): Promise<UserMissionAddResponse> => {
  const mission = await getMission(missionId);
  if (mission == null) throw new MissionUpdateError("미션 불러오는데 실패했습니다");

  const existing = await getUserMission(userId, missionId);
  if (existing) throw new DuplicateMissionError("이미 도전 중인 미션입니다.");
  const userMissionId = await addUserMission(userId, missionId, mission.storeId);
  return <UserMissionAddResponse>{ userMissionId };
};

// 내가 작성한 리뷰 목록
export const userReviewList = async (userId: number): Promise<ReviewItem[]> => {
  return await getUserReviews(userId);
};

// 특정 가게의 미션 목록
export const storeMissionList = async (storeId: number) => {
  const store = await getStore(storeId);
  if (store == null) throw new storefindError("존재하지 않는 가게입니다.");

  return await getStoreMissions(storeId);
};

// 내가 진행 중인 미션 목록
export const userMissionList = async (userId: number) => {
  return await getUserMissions(userId);
};

// 미션 진행 완료로 변경
export const completeUserMission = async (userId: number, missionId: number) => {
  const existing = await getUserMission(userId, missionId);
  if (existing == null) throw new NotFixMissionStatusError("진행 중인 미션이 아닙니다.");
  if (existing.status === "completed") throw new AlreadyCompletedMissionError("이미 완료된 미션입니다.");
  return await completUserMission(userId, missionId);
};