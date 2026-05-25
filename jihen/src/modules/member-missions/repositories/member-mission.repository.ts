import { prisma } from "../../../db.config";

interface MemberMission {
  membermissionId: bigint;
  memberId: bigint;
  missionId: bigint;
  status: number;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const completeMemberMission = async (memberMissionId: number): Promise<MemberMission> => {
  return await prisma.memberMission.update({
    where: { membermissionId: BigInt(memberMissionId) },
    data: { status: 1, completedAt: new Date() },
  }) as MemberMission;
};