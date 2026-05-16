import { prisma } from "../../../db.config";
import { Gender } from "../../../generated/prisma/enums";

interface CreateMemberData {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  birth: Date;
  address?: string;
  detailAddress?: string;
  phoneNum: string;
}

interface MemberRow {
  memberId: bigint;
  email: string;
  name: string;
  gender: Gender | null;
  birth: Date | null;
  address: string | null;
  detailAddress: string | null;
  phoneNum: string | null;
}

interface UserPreferenceRow {
  userFavorCategoryId: number;
  memberId: bigint;
  foodCategoryId: number;
  foodCategory: { foodCategoryId: number; name: string } | null;
}

export const addUser = async (data: CreateMemberData): Promise<bigint | null> => {
  const member = await prisma.member.findFirst({ where: { email: data.email } });
  if (member) return null;

  const created = await prisma.member.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNum: data.phoneNum,
    },
  });

  return created.memberId;
};

export const getUser = async (memberId: bigint): Promise<MemberRow> => {
  return await prisma.member.findFirstOrThrow({
    where: { memberId },
    select: { memberId: true, email: true, name: true, gender: true, birth: true, address: true, detailAddress: true, phoneNum: true },
  }) as MemberRow;
};

export const setPreferences = async (memberId: bigint, foodCategoryIds: number[]): Promise<void> => {
  await prisma.userFavorCategory.createMany({
    data: foodCategoryIds.map((foodCategoryId) => ({ memberId, foodCategoryId })),
  });
};

export const getUserPreferencesByUserId = async (memberId: bigint): Promise<UserPreferenceRow[]> => {
  return await prisma.userFavorCategory.findMany({
    where: { memberId },
    select: {
      userFavorCategoryId: true,
      memberId: true,
      foodCategoryId: true,
      foodCategory: { select: { foodCategoryId: true, name: true } },
    },
    orderBy: { foodCategoryId: "asc" },
  }) as UserPreferenceRow[];
};
