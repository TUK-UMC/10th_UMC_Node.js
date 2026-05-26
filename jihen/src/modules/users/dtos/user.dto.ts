export interface UserSignUpRequest {
  email: string;
  password: string;
  name: string;
  gender: string;
  birth: Date;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}

export interface UserSignUpResponse {
  userId: number;
  preferences: string[];
}
