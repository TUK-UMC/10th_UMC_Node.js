import { prisma } from "../../../db.config";

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress?: string;
  phoneNumber: string;
}

interface UserRow {
  id: number;
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string | null;
  phoneNumber: string;
}

interface UserPreferenceRow {
  id: number;
  userId: number | null;
  foodCategoryId: number | null;
  foodCategory: { id: number; name: string } | null;
}

export const addUser = async (data: CreateUserData): Promise<number | null> => {
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

export const getUser = async (userId: number): Promise<UserRow> => {
  return await prisma.user.findFirstOrThrow({
    where: { id: userId },
    select: { id: true, email: true, name: true, gender: true, birth: true, address: true, detailAddress: true, phoneNumber: true },
  }) as UserRow;
};

export const setPreferences = async (userId: number, foodCategoryIds: number[]): Promise<void> => {
  await prisma.userFavorCategory.createMany({
    data: foodCategoryIds.map((foodCategoryId) => ({ userId, foodCategoryId })),
  });
};

export const updateMember = async (memberId: number, data: {
  name?: string;
  nickname?: string;
  birth?: Date;
  phoneNum?: string;
}): Promise<void> => {
  await prisma.member.update({
    where: { memberId: BigInt(memberId) },
    data,
  });
};

export const getUserPreferencesByUserId = async (userId: number): Promise<UserPreferenceRow[]> => {
  return await prisma.userFavorCategory.findMany({
    where: { userId },
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: { select: { id: true, name: true } },
    },
    orderBy: { foodCategoryId: "asc" },
  }) as UserPreferenceRow[];
};
