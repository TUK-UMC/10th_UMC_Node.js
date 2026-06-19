import {
  type AddMissionRequest, type AddMissionResponse,
  type ChallengeMissionResponse,
  type MissionItem,
} from "../dtos/mission.dto";
import {
  addMission,
  getMissionById,
  getMissionsByStoreId,
  getChallengingMission,
  challengeMission,
} from "../repositories/mission.repository";
import { getStoreById } from "../../stores/repositories/store.repository";
import {
  StoreNotFoundError,
  MissionNotFoundError,
  DuplicateMissionChallengeError,
} from "../../../common/errors/error";

export const createMission = async (storeId: number, data: AddMissionRequest): Promise<AddMissionResponse> => {
  const store = await getStoreById(storeId);
  if (!store) throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId });
  const missionId = await addMission(storeId, data);
  return { missionId };
};

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

export const startMissionChallenge = async (missionId: number, memberId: number): Promise<ChallengeMissionResponse> => {
  const mission = await getMissionById(missionId);
  if (!mission) throw new MissionNotFoundError("존재하지 않는 미션입니다.", { missionId });

  const existing = await getChallengingMission(memberId, missionId);
  if (existing) throw new DuplicateMissionChallengeError("이미 도전 중인 미션입니다.", { memberId, missionId });

  const challengeId = await challengeMission(memberId, missionId);
  return { challengeId };
};
