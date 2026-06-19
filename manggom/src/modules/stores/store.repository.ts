import { prisma } from "../../db.config.js";

// 1-1. 가게 추가
export const addStore = async (data: {
  title: string;
  oneLine: string;
  place: string;
}) => {
  const store = await prisma.store.create({
    data: {
      title: data.title,
      oneLine: data.oneLine,
      place: data.place,
    },
  });
  return store.id;
};

// 가게 존재 여부 확인
export const getStore = async (storeId: number) => {
  return await prisma.store.findFirst({ where: { id: storeId } });
};

// 1-2. 리뷰 추가
export const addReview = async (
  storeId: number,
  data: { userId: number; detail: string; starScore: number }
) => {
  const review = await prisma.review.create({
    data: {
      storeId,
      userId: data.userId,
      detail: data.detail,
      starScore: data.starScore,
    },
  });
  return review.id;
};

// 리뷰 목록 조회
export const getStoreReviews = async (storeId: number) => {
  return await prisma.review.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  });
};

// 미션 추가
export const addMission = async (
  storeId: number,
  data: { explanation: string }
) => {
  const mission = await prisma.mission.create({
    data: {
      storeId,
      explanation: data.explanation,
    },
  });
  return mission.id;
};

// 미션 존재 여부 확인
export const getMission = async (missionId: number) => {
  return await prisma.mission.findFirst({ where: { id: missionId } });
};

// 이미 도전 중인 미션인지 확인
export const getUserMission = async (userId: number, missionId: number) => {
  return await prisma.userMission.findFirst({
    where: { userId, missionId, status: "도전중" },
  });
};

// 1-4. 미션 도전 추가
export const addUserMission = async (
  userId: number,
  missionId: number,
  storeId: number
) => {
  const userMission = await prisma.userMission.create({
    data: {
      userId,
      missionId,
      storeId,
      status: "도전중",
    },
  });
  return userMission.id;
};

// 내가 작성한 리뷰 목록
export const getUserReviews = async (userId: number) => {
  return await prisma.review.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

// 특정 가게의 미션 목록
export const getStoreMissions = async (storeId: number) => {
  return await prisma.mission.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  });
};

// 내가 진행 중인 미션 목록
export const getUserMissions = async (userId: number) => {
  return await prisma.userMission.findMany({
    where: { userId, status: "진행중" },
    include: { mission: true, store: true },
    orderBy: { createdAt: "desc" },
  });
};

// 미션 진행 완료로 변경
export const completUserMission = async (userId: number, missionId: number) => {
  return await prisma.userMission.updateMany({
    where: { userId, missionId, status: "진행중" },
    data: { status: "진행완료" },
  });
};