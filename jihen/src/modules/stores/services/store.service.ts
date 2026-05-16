import {
  type AddStoreRequest, type AddStoreResponse,
  type AddReviewRequest, type AddReviewResponse,
  type AddMissionRequest, type AddMissionResponse,
  type ChallengeMissionRequest, type ChallengeMissionResponse,
  type MissionItem, type ReviewsResponse,
  type OngoingMissionItem, type CompleteMissionResponse,
} from "../dtos/store.dto";
import {
  addStore,
  getStoreById,
  getStoreByNameAndAddress,
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
} from "../repositories/store.repository";
import {
  DuplicateStoreError,
  StoreNotFoundError,
  MissionNotFoundError,
  DuplicateMissionChallengeError,
} from "../../../common/errors/error";

export const createStore = async (data: AddStoreRequest): Promise<AddStoreResponse> => {
  const existing = await getStoreByNameAndAddress(data.name, data.address);
  if (existing) throw new DuplicateStoreError("이미 동일한 이름과 주소의 가게가 존재합니다.", data);
  const storeId = await addStore(data);
  return { storeId };
};

export const createReview = async (storeId: number, data: AddReviewRequest): Promise<AddReviewResponse> => {
  const store = await getStoreById(storeId);
  if (!store) throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId });
  const reviewId = await addReview(storeId, data);
  return { reviewId };
};

export const createMission = async (storeId: number, data: AddMissionRequest): Promise<AddMissionResponse> => {
  const store = await getStoreById(storeId);
  if (!store) throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId });
  const missionId = await addMission(storeId, data);
  return { missionId };
};

export const startMissionChallenge = async (missionId: number, data: ChallengeMissionRequest): Promise<ChallengeMissionResponse> => {
  const mission = await getMissionById(missionId);
  if (!mission) throw new MissionNotFoundError("존재하지 않는 미션입니다.", { missionId });

  const existing = await getChallengingMission(data.memberId, missionId);
  if (existing) throw new DuplicateMissionChallengeError("이미 도전 중인 미션입니다.", { memberId: data.memberId, missionId });

  const challengeId = await challengeMission(data.memberId, missionId);
  return { challengeId };
};
<<<<<<< feat/issue-30

export const getStoreMissions = async (storeId: number): Promise<MissionItem[]> => {
  const store = await getStoreById(storeId);
  if (!store) throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId });
  const missions = await getMissionsByStoreId(storeId);
  return missions.map((m) => ({
    missionId: Number(m.missionId),
    title: m.title,
    description: m.description,
    rewardPoint: m.rewardPoint,
    startAt: m.startAt,
    endAt: m.endAt,
  }));
};

export const getMyOngoingMissions = async (memberId: number): Promise<OngoingMissionItem[]> => {
  const missions = await getOngoingMissionsByMemberId(memberId);
  return missions.map((m) => ({
    membermissionId: Number(m.membermissionId),
    status: m.status,
    mission: {
      missionId: Number(m.mission.missionId),
      title: m.mission.title,
      store: {
        storeId: Number(m.mission.store.storeId),
        name: m.mission.store.name,
      },
    },
  }));
};

export const finishMission = async (memberMissionId: number): Promise<CompleteMissionResponse> => {
  const result = await completeMemberMission(memberMissionId);
  return {
    membermissionId: Number(result.membermissionId),
    status: result.status,
    completedAt: result.completedAt,
  };
};

export const listStoreReviews = async (storeId: number, cursor: number): Promise<ReviewsResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  const lastReview = reviews[reviews.length - 1];
  return {
    data: reviews,
    pagination: { cursor: lastReview ? lastReview.id : null },
  };
};
=======
>>>>>>> develop
