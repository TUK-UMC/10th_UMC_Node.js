import { FindOrCreateProviderRequest } from "./provider.dto.js";
import { addProvider, findByProvider } from "./provider.repository.js";
import { addOAuthUser } from "../users/user.repository.js";
import { AppError } from "../../common/error/app.error.js";

export const findOrCreateProviderUser = async (data: FindOrCreateProviderRequest): Promise<bigint> => {
  try {
    const existing = await findByProvider(data.provider, data.providerUserId);
    if (existing) return existing.user.userId;

    const userId = await addOAuthUser({
      email: data.email,
      name: data.name,
    });

    await addProvider({
      provider: data.provider,
      providerUserId: data.providerUserId,
      userId,
    });

    return userId;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({ errorCode: "INTERNAL", statusCode: 500, message: "소셜 로그인 처리 중 오류가 발생했습니다" });
  }
};
