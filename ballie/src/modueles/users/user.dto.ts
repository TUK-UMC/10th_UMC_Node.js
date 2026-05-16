import { Gender } from "../../generated/prisma/enums.js";

export { Gender };

/** 유저 생성 요청 body*/
export interface UserSignUpRequest {
    /** 이메일 */
    email: string;
    name: string;
    /** 성벌 ex: MALE, FEMALE */
    gender: Gender;
    birth: string;
    address: string;
    phoneNumber: string;
    password: string;
    /**선호사항 카테고리ID*/
    preferences: number[];
}
/** 유저 생성 응답*/
export interface userSignUpResponse{
    userId : number
    /**유저 선호 카테고리 목록*/
    preferences : String[]
}
