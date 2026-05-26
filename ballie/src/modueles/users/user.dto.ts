import { Gender } from "../../generated/prisma/enums.js";

export { Gender };

/** 프로필 완성 요청 */
export interface UpdateProfileRequest {
  /** 성별: MALE | FEMALE */
  gender: Gender;
  /** 생년월일 ex: 2000-01-01 */
  birth: string;
  address: string;
  phoneNumber: string;
  /** 선호 카테고리 ID 목록 */
  preferences: number[];
}

/** 프로필 완성 응답 */
export interface UpdateProfileResponse {
  userId: number;
  preferences: string[];
}

/** 프로필 조회 응답 */
export interface UserProfileResponse {
  userId: number;
  email: string | null;
  name: string;
  gender: string | null;
  birth: string | null;
  address: string | null;
  phoneNumber: string | null;
  preferences: string[];
}
