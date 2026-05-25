import { prisma } from "../../../db.config";
import { type AddStoreRequest, type AddReviewRequest } from "../dtos/store.dto";

interface Store {
  storeId: bigint;
  regionId: bigint;
  name: string;
  address: string;
  category: number;
  createdAt: Date;
  updatedAt: Date;
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