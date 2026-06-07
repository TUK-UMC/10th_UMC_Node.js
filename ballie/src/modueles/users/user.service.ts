import { UpdateProfileRequest, UpdateProfileResponse, UserProfileResponse } from "./user.dto.js";
import {
  findFoodCategory,
  getUserPreferencesByUserId,
  getUserWithPreferences,
  setPreference,
  updateUserProfile,
} from "./user.repository.js";
import { AppError } from "../../common/error/app.error.js";
import { InvalidCategoryError, UserNotFoundError } from "../../common/error/error.js";

export const updateProfile = async (
  userId: bigint,
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  try {
    for (const categoryId of data.preferences) {
      const category = await findFoodCategory(categoryId);
      if (!category) {
        throw new InvalidCategoryError(`존재하지 않는 카테고리입니다: ${categoryId}`);
      }
    }

    await updateUserProfile(userId, {
      gender: data.gender,
      birth: new Date(data.birth),
      address: data.address,
      phoneNumber: data.phoneNumber,
    });

    for (const categoryId of data.preferences) {
      await setPreference(userId, categoryId);
    }

    const preferences = (await getUserPreferencesByUserId(userId)).map(
      (obj) => obj.foodCategory.categoryName
    );

    return { userId: Number(userId), preferences };
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "프로필 업데이트 중 오류가 발생했습니다" });
  }
};

export const getProfile = async (userId: bigint): Promise<UserProfileResponse> => {
  try {
    const user = await getUserWithPreferences(userId);

    if (!user) throw new UserNotFoundError("존재하지 않는 유저입니다");

    return {
      userId: Number(user.userId),
      email: user.email ?? null,
      name: user.name,
      gender: user.gender ?? null,
      birth: user.birth ? (user.birth.toISOString().split("T")[0] ?? null) : null,
      address: user.address ?? null,
      phoneNumber: user.phoneNumber ?? null,
      preferences: user.userFavorCategories.map((c) => c.foodCategory.categoryName),
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "프로필 조회 중 오류가 발생했습니다" });
  }
};
