import { type OngoingMissionItem } from "../dtos/member.dto";
import { getOngoingMissionsByMemberId } from "../repositories/member.repository";

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
