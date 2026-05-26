import { type UserSignUpRequest, type UserSignUpResponse, type UpdateUserRequest, type UpdateUserResponse } from "../dtos/user.dto";
import { addUser, getUser, getUserPreferencesByUserId, setPreferences, updateMember } from "../repositories/user.repository";
import { DuplicateUserEmailError } from "../../../common/errors/error";
import { Gender } from "../../../generated/prisma/enums";
import bcrypt from "bcrypt";

const resolveGender = (g: string): Gender => {
  if (g === "남성") return Gender.MALE;
  if (g === "여성") return Gender.FEMALE;
  return Gender.OTHER;
};

export const signUpUser = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const memberId = await addUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    gender: resolveGender(data.gender),
    birth: new Date(data.birth),
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNum: data.phoneNumber,
  });

  if (memberId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  if (data.preferences.length > 0) {
    await setPreferences(memberId, data.preferences);
  }

  const member = await getUser(memberId);
  const preferences = await getUserPreferencesByUserId(memberId);

  return {
    userId: Number(member.memberId),
    preferences: preferences.map((p) => p.foodCategory?.name ?? ""),
  };
};

export const updateMyInfo = async (memberId: number, data: UpdateUserRequest): Promise<UpdateUserResponse> => {
  await updateMember(memberId, {
    name: data.name,
    nickname: data.nickname,
    birth: data.birth ? new Date(data.birth) : undefined,
    phoneNum: data.phoneNum,
  });
  return { userId: memberId };
};
