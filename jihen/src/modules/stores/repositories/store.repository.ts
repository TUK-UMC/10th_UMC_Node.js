import { prisma } from "../../../db.config";
import { type AddStoreRequest, type AddReviewRequest } from "../dtos/store.dto";

interface ReviewRow {
  reviewId: bigint;
  body: string;
  score: number;
  memberId: bigint;
  createdAt: Date;
}

export const addStore = async (data: AddStoreRequest): Promise<number> => {
  const store = await prisma.store.create({
    data: {
      regionId: BigInt(data.regionId),
      name: data.name,
      address: data.address,
      category: data.category as any,
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

export const getStoreByNameAndAddress = async (name: string, address: string) => {
  return await prisma.store.findFirst({ where: { name, address } });
};

export const addReview = async (storeId: number, memberId: number, data: AddReviewRequest): Promise<number> => {
  const review = await prisma.review.create({
    data: {
      memberId: BigInt(memberId),
      storeId: BigInt(storeId),
      body: data.body,
      score: data.score,
    },
  });
  return Number(review.reviewId);
};

export const getAllStoreReviews = async (storeId: number, cursor: number): Promise<ReviewRow[]> => {
  return await prisma.review.findMany({
    where: {
      storeId: BigInt(storeId),
      reviewId: { gt: BigInt(cursor) },
    },
    select: {
      reviewId: true,
      body: true,
      score: true,
      memberId: true,
      createdAt: true,
    },
    orderBy: { reviewId: "asc" },
    take: 5,
  }) as ReviewRow[];
};
