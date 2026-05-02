import { prisma } from "../../../db.config.js";

export const addUser = async (data: any): Promise<number | null> => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) return null;

  const created = await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    },
  });

  return created.id;
};

export const getUser = async (userId: number): Promise<any> => {
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

export const setPreference = async (userId: number, foodCategoryId: number): Promise<void> => {
  await prisma.userFavorCategory.create({
    data: { userId, foodCategoryId },
  });
};

export const getUserPreferencesByUserId = async (userId: number): Promise<any[]> => {
  return await prisma.userFavorCategory.findMany({
    where: { userId },
    include: { foodCategory: true },
    orderBy: { foodCategoryId: "asc" },
  });
};
