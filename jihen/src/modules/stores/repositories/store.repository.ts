import { prisma } from "../../../db.config.js";
import { type AddStoreRequest, type AddReviewRequest, type AddMissionRequest } from "../dtos/store.dto.js";

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

export const getStoreById = async (storeId: number): Promise<any | null> => {
  return await prisma.store.findFirst({ where: { storeId: BigInt(storeId) } });
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

export const getMissionById = async (missionId: number): Promise<any | null> => {
  return await prisma.mission.findFirst({ where: { missionId: BigInt(missionId) } });
};

export const getChallengingMission = async (memberId: number, missionId: number): Promise<any | null> => {
  return await prisma.memberMission.findFirst({
    where: { memberId: BigInt(memberId), missionId: BigInt(missionId), status: 0 },
  });
};

export const challengeMission = async (memberId: number, missionId: number): Promise<number> => {
  const result = await prisma.memberMission.create({
    data: { memberId: BigInt(memberId), missionId: BigInt(missionId), status: 0 },
  });
  return Number(result.membermissionId);
};

// 가게 리뷰 목록 (커서 페이지네이션)
export const getAllStoreReviews = async (storeId: number, cursor: number) => {
  return await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      store: true,
      user: true,
    },
    where: {
      storeId,
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
  });
};

// ③ 특정 가게의 미션 목록
export const getMissionsByStoreId = async (storeId: number): Promise<any[]> => {
  return await prisma.mission.findMany({
    where: { storeId: BigInt(storeId) },
    orderBy: { createdAt: "desc" },
  });
};

// ④ 내가 진행 중인 미션 목록
export const getOngoingMissionsByMemberId = async (memberId: number): Promise<any[]> => {
  return await prisma.memberMission.findMany({
    where: { memberId: BigInt(memberId), status: 0 },
    include: {
      mission: {
        include: { store: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// ⑤ 진행 중인 미션 완료 처리
export const completeMemberMission = async (memberMissionId: number): Promise<any> => {
  return await prisma.memberMission.update({
    where: { membermissionId: BigInt(memberMissionId) },
    data: { status: 1, completedAt: new Date() },
  });
};
