import { type CompleteMissionResponse } from "../dtos/member-mission.dto";
import { completeMemberMission } from "../repositories/member-mission.repository";

export const finishMission = async (memberMissionId: number): Promise<CompleteMissionResponse> => {
  const result = await completeMemberMission(memberMissionId);
  return {
    membermissionId: Number(result.membermissionId),
    status: result.status,
    completedAt: result.completedAt,
  };
};
