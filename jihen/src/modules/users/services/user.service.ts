import { type UserSignUpRequest, type UserSignUpResponse } from "../dtos/user.dto";
import { addUser, getUser, getUserPreferencesByUserId, setPreferences } from "../repositories/user.repository";
import { DuplicateUserEmailError } from "../../../common/errors/error";
import bcrypt from "bcrypt";

export const signUpUser = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userId = await addUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address ?? "",
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (userId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  if (data.preferences.length > 0) {
    await setPreferences(userId, data.preferences);
  }

  const user = await getUser(userId);
  const preferences = await getUserPreferencesByUserId(userId);

  return {
    userId: user.id,
    preferences: preferences.map((p) => p.foodCategory?.name ?? ""),
  };
};
