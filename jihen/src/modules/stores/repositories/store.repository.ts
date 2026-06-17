import { prisma } from "../../../db.config";
import { StoreCategory, MissionStatus } from "../../../generated/prisma/enums";
import { type AddStoreRequest, type AddReviewRequest, type AddMissionRequest } from "../dtos/store.dto";

interface Store {
  storeId: bigint;
  regionId: bigint;
  name: string;
  address: string;
  category: StoreCategory;
  createdAt: Date;
  updatedAt: Date;
}

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

interface OngoingMission extends MemberMission {
  mission: Mission & { store: Store };
}

export const addStore = async (data: AddStoreRequest): Promise<number> => {
  const store = await prisma.store.create({
    data: {
      regionId: BigInt(data.regionId),
      name: data.name,
      address: data.address,
      category: data.category,
    },
  });
  return Number(store.storeId);
};

export const getStoreById = async (storeId: number): Promise<{ storeId: bigint } | null> => {
  return await prisma.store.findFirst({
    where: { storeId: BigInt(storeId) },
    select: { storeId: true },
  });
};

export const getStoreByNameAndAddress = async (name: string, address: string): Promise<Store | null> => {
  return await prisma.store.findFirst({ where: { name, address } });
};

export const addReview = async (storeId: number, data: AddReviewRequest): Promise<number> => {
  const review = await prisma.review.create({
    data: {
      memberId: BigInt(data.memberId),
      storeId: BigInt(storeId),
      body: data.body,
      score: data.score,
    },
  });
  return Number(review.reviewId);
};

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

export const getAllStoreReviews = async (storeId: number, cursor: number) => {
  return await prisma.review.findMany({
    select: {
      reviewId: true,
      body: true,
      store: true,
      member: true,
    },
    where: {
      storeId: BigInt(storeId),
      reviewId: { gt: BigInt(cursor) },
    },
    orderBy: { reviewId: "asc" },
    take: 5,
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

export const getOngoingMissionsByMemberId = async (memberId: number): Promise<OngoingMission[]> => {
  return await prisma.memberMission.findMany({
    where: { memberId: BigInt(memberId), status: MissionStatus.IN_PROGRESS },
    include: {
      mission: {
        include: { store: true },
      },
    },
    orderBy: { createdAt: "desc" },
  }) as OngoingMission[];
};

export const completeMemberMission = async (memberMissionId: number): Promise<MemberMission> => {
  return await prisma.memberMission.update({
    where: { memberMissionId: BigInt(memberMissionId) },
    data: { status: MissionStatus.COMPLETE, completedAt: new Date() },
  }) as MemberMission;
};
