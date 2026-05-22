export interface UserSignUpRequest {
    /** 유저 이메일 (로그인 시 사용) */
    email: string;
    /** 유저 이름 */
    name: string;
    /** 유저 성별 */
    gender: string;
    /** 유저 생년월일 */
    birth: Date;
    /** 유저 주소 */
    address?: string;
    /** 유저 전화번호 */
    phone: string;
    /** 선호 카테고리 ID 배열 (예: [1, 2]) */
    preferences: number[];
}

export interface UserSignUpResponse {
    userId: number;
    email: string;
    name: string;
    gender: string;
    birth: Date;
    address?: string;
    phone: string;
    preferences: string[];
}

export interface ChallengeMissionRequest {
    userId: number;
    missionId: number;
}

export interface ChallengeMissionResponse {
    missionId: number;
    status: string;
}

export interface CreateMissionDto {
    name: string;
    price: number;
    point: number;
}

export interface ChallengeMissionDto {
    missionId: number;
}

export interface UserReviewRow {
    id: number;
    userId: number;
    restaurantId: number | null;
    content: string | null;
    star: { toString(): string } | null;
}

export interface UserReviewItem {
    id: number;
    userId: number;
    restaurantId: number | null;
    content: string | null;
    star: string | null;
}

export interface UserReviewListResponse {
    data: UserReviewItem[];
    pagination: {
        cursor: number | null;
    };
}

export interface UserMissionRow {
    id: number;
    restaurantId: number | null;
    price: number | null;
    point: number | null;
}

export interface UserMissionItem {
    id: number;
    restaurantId: number | null;
    price: number | null;
    point: number | null;
}

export interface UserMissionListResponse {
    data: UserMissionItem[];
    pagination: {
        cursor: number | null;
    };
}
