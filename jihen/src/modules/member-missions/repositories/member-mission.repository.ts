import { prisma } from "../../../db.config";
import { MissionStatus } from "../../../generated/prisma/enums";

interface MemberMission {
  memberMissionId: bigint;
  memberId: bigint;
  missionId: bigint;
  status: MissionStatus;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const completeMemberMission = async (memberMissionId: number): Promise<MemberMission> => {
  return await prisma.memberMission.update({
    where: { memberMissionId: BigInt(memberMissionId) },
    data: { status: MissionStatus.COMPLETE, completedAt: new Date() },
  }) as MemberMission;
};
