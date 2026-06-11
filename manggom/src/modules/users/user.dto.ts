// 요청 DTO
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}

// 응답 DTO
export interface UserSignUpResponse {
  email: string;
  name: string;
  preferCategory: string[];
}