import { prisma } from "../../db.config.js";
import { Gender } from "../../generated/prisma/enums.js";

export const addOAuthUser = async (data: {
  email: string;
  name: string;
}): Promise<bigint> => {
  const result = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
    },
  });
  return result.userId;
};

export const getUser = async (userId: bigint) => {
  return await prisma.user.findFirstOrThrow({ where: { userId } });
};

export const updateUserProfile = async (userId: bigint, data: {
  gender: Gender;
  birth: Date;
  address: string;
  phoneNumber: string;
}) => {
  return await prisma.user.update({
    where: { userId },
    data: {
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      phoneNumber: data.phoneNumber,
    },
  });
};

export const setPreference = async (userId: bigint, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId: BigInt(foodCategoryId),
    },
  });
};

export const getUserPreferencesByUserId = async (userId: bigint) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId },
    include: { foodCategory: true },
    orderBy: { foodCategoryId: "asc" },
  });
};

export const getUserWithPreferences = async (userId: bigint) => {
  return await prisma.user.findUnique({
    where: { userId },
    include: {
      userFavorCategories: { include: { foodCategory: true } },
    },
  });
};

export const findFoodCategory = async (foodCategoryId: number) => {
  return await prisma.foodCategory.findUnique({
    where: { foodCategoryId: BigInt(foodCategoryId) },
  });
};

