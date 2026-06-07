import { prisma } from "../../db.config.js";
import { ProviderType } from "../../generated/prisma/enums.js";

export const findByProvider = async (provider: ProviderType, providerUserId: string) => {
  return await prisma.provider.findFirst({
    where: { provider, providerUserId },
    include: { user: true },
  });
};

export const addProvider = async (data: {
  provider: ProviderType;
  providerUserId: string;
  userId: bigint;
}) => {
  return await prisma.provider.create({
    data: {
      provider: data.provider,
      providerUserId: data.providerUserId,
      userId: data.userId,
    },
  });
};
