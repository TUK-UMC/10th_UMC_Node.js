export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;
  /** 비밀번호 */
  password: string;
  /** 유저 이름 */
  name: string;
  /** 성별 (남성 / 여성) */
  gender: string;
  /** 생년월일 (예: 2000-01-01) */
  birth: Date;
  /** 주소 */
  address?: string;
  /** 상세 주소 */
  detailAddress?: string;
  /** 전화번호 (예: 010-1234-5678) */
  phoneNumber: string;
  /** 선호 카테고리 ID 배열 (예: [1, 2]) */
  preferences: number[];
}

export interface UserSignUpResponse {
  /** 생성된 유저 ID */
  userId: number;
  /** 선택한 선호 카테고리 이름 목록 */
  preferences: string[];
}
