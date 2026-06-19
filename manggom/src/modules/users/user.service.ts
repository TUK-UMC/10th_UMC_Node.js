import type { UserSignUpRequest, UserSignUpResponse } from "./user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "./user.repository.js";
import { DuplicateUserEmailError } from "../../common/errors/error.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  const preferCategory = preferences.map((p: any) => p.foodCategory.name);

  return <UserSignUpResponse>{
    email: user.email,
    name: user.name,
    preferCategory,
  };
};