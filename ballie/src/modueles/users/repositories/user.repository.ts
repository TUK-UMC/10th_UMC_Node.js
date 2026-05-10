import { prisma } from "../../../db.config.js";

export const addUser = async (data: {
  email: string;
  name: string;
  gender: number;
  birth: Date;
  address: string;
  phoneNumber: string;
  password: string;
}): Promise<number | null> => {
  const existing = await prisma.user.findFirst({ where: { email: data.email } });
  if (existing) return null;

  const result = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      phoneNumber: data.phoneNumber,
      password: data.password,
    },
  });
  return Number(result.userId);
};

export const getUser = async (userId: number) => {
  return await prisma.user.findFirstOrThrow({ where: { userId: BigInt(userId) } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: BigInt(userId),
      foodCategoryId: BigInt(foodCategoryId),
    },
  });
};

// 사용자 선호 카테고리 반환 (JOIN)
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId: BigInt(userId) },
    include: { foodCategory: true },
    orderBy: { foodCategoryId: "asc" },
  });
};
