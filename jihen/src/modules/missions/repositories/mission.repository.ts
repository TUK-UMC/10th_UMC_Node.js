import { prisma } from "../../../db.config";
import { MissionStatus } from "../../../generated/prisma/enums";
import { type AddMissionRequest } from "../dtos/mission.dto";

interface Mission {
  missionId: bigint;
  storeId: bigint;
  title: string;
  description: string | null;
  rewardPoint: number;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface MemberMission {
  memberMissionId: bigint;
  memberId: bigint;
  missionId: bigint;
  status: MissionStatus;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const addMission = async (storeId: number, data: AddMissionRequest): Promise<number> => {
  const mission = await prisma.mission.create({
    data: {
      storeId: BigInt(storeId),
      title: data.title,
      description: data.description ?? null,
      rewardPoint: data.rewardPoint,
      startAt: data.startAt ? new Date(data.startAt) : null,
      endAt: data.endAt ? new Date(data.endAt) : null,
    },
  });
  return Number(mission.missionId);
};

export const getMissionById = async (missionId: number): Promise<{ missionId: bigint } | null> => {
  return await prisma.mission.findFirst({
    where: { missionId: BigInt(missionId) },
    select: { missionId: true },
  });
};

export const getMissionsByStoreId = async (storeId: number): Promise<Mission[]> => {
  return await prisma.mission.findMany({
    where: { storeId: BigInt(storeId) },
    select: {
      missionId: true,
      storeId: true,
      title: true,
      description: true,
      rewardPoint: true,
      startAt: true,
      endAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  }) as Mission[];
};

export const getChallengingMission = async (memberId: number, missionId: number): Promise<{ memberMissionId: bigint } | null> => {
  return await prisma.memberMission.findFirst({
    where: { memberId: BigInt(memberId), missionId: BigInt(missionId), status: MissionStatus.IN_PROGRESS },
    select: { memberMissionId: true },
  });
};

export const challengeMission = async (memberId: number, missionId: number): Promise<number> => {
  const result = await prisma.memberMission.create({
    data: { memberId: BigInt(memberId), missionId: BigInt(missionId), status: MissionStatus.IN_PROGRESS },
  });
  return Number(result.memberMissionId);
};
