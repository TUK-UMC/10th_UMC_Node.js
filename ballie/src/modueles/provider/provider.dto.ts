import { ProviderType } from "../../generated/prisma/enums.js";

export { ProviderType };

export interface FindOrCreateProviderRequest {
  provider: ProviderType;
  providerUserId: string;
  email: string;
  name: string;
}
