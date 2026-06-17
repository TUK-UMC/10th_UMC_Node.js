import { prisma } from "../../../db.config";
import { type Gender } from "../../../generated/prisma/enums";

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

interface MemberPreferenceRow {
  userFavorCategoryId: number;
  memberId: bigint;
  foodCategoryId: number;
  foodCategory: { foodCategoryId: number; name: string } | null;
}

export const addUser = async (data: CreateMemberData): Promise<number | null> => {
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

  return Number(created.memberId);
};

export const getUser = async (memberId: number): Promise<MemberRow> => {
  return await prisma.member.findFirstOrThrow({
    where: { memberId: BigInt(memberId) },
    select: { memberId: true, email: true, name: true, gender: true, birth: true, address: true, detailAddress: true, phoneNum: true },
  }) as MemberRow;
};

export const setPreferences = async (memberId: number, foodCategoryIds: number[]): Promise<void> => {
  await prisma.userFavorCategory.createMany({
    data: foodCategoryIds.map((foodCategoryId) => ({ memberId: BigInt(memberId), foodCategoryId })),
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

export const getUserPreferencesByUserId = async (memberId: number): Promise<MemberPreferenceRow[]> => {
  return await prisma.userFavorCategory.findMany({
    where: { memberId: BigInt(memberId) },
    select: {
      userFavorCategoryId: true,
      memberId: true,
      foodCategoryId: true,
      foodCategory: { select: { foodCategoryId: true, name: true } },
    },
    orderBy: { foodCategoryId: "asc" },
  }) as MemberPreferenceRow[];
};
