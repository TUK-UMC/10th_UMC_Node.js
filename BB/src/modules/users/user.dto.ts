import { Decimal } from "@prisma/client/runtime/client";

// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
    email: string;
    name: string;
    gender: string;
    birth: Date;
    address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
    phone: string;
    preferences: string[];
}

export interface UserSignUpResponse {
    email: string;
    name: string;
    gender: string;
    birth: Date;
    address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
    phone: string;
    preferences: string[];
}


export interface ChallengeMissionRequest {
    userId: bigint,
    missionId: bigint
}

export interface ChallengeMissionResponse {
    missionId: string;
    status: string;
}

export interface MissionListResponse {
    missionId: string;
    restaurantId: string,
    price: string,
    point: string,
}

export interface ReviewListResponse {
    reviewId: string;
    restaurantId: string,
}


/*
// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => {
    const birth = new Date(body.birth); //날짜 변환

    return {
        email: body.email, //필수 
        name: body.name, // 필수
        gender: body.gender, // 필수
        birth, // 필수
        address: body.address || "", //선택 
        phone: body.phone,//필수
        preferences: body.preferences,// 필수 
    };
};

// responseFromUser : Service에서 받아온 유저 정보 + 선호 카테고리 리스트를 클라이언트에게 보여줄 수 있는 형식으로 변환해주는 DTO 함수
export const responseFromUser = (data: { user: any; preferences: any[] }): UserSignUpResponse => {
    const preferences = data.preferences.map((p) => p.category.name);

    return {
        email: data.user.email,
        name: data.user.name,
        gender: data.user.gender,
        birth: data.user.birth,
        address: data.user.address,
        phone: data.user.phone,
        preferences: preferences,
    }
};

*/
export interface CreateMissionDto {
    name: string;
    price: number;
    point: number;
}

export interface ChallengeMissionDto {
    missionId: number;
}

/*
export const responseFromReviews = (
    reviews: ReviewRow[],
    cursor: number
): ReviewListResponse => {

    return {
        data: reviews.map((review) => ({
            ...review,
            id: review.id.toString(),
            restaurantId: review.restaurantId?.toString() || null,
            userId: review.userId.toString(),
            content: review.content,
            star: review.star === null ? null : Decimal(review.star),
        })),
        pagination: {
            cursor: reviews.length === 5 ? cursor + 1 : null,
        },
    };
};

export const responseFromMissions = (
    missions: MissionRow[],
    cursor: number
): MissionListResponse => {

    return {
        data: missions.map((complete) => ({
            ...complete,
            id: complete.id.toString(),
            restaurantId: complete.restaurantId?.toString() || null,
            price: complete.price,
            point: complete.point,
        })),
        pagination: {
            cursor: missions.length === 5 ? cursor + 1 : null,
        },
    };
};

*/

export interface ReviewRow {
    id: bigint;
    userId: bigint;
    restaurantId: bigint | null;
    content: string | null;
    star: Decimal | null;
}

export interface ReviewItem {
    id: string;
    userId: string;
    restaurantId: string | null;
    content: string | null;
    star: Decimal | null;
}

export interface ReviewListResponse {
    data: ReviewItem[];
    pagination: {
        cursor: number | null;
    };
}

export interface MissionRow {
    id: bigint;
    restaurantId: bigint | null;
    price: number | null;
    point: number | null;
}

export interface MissionItem {
    id: string;
    restaurantId: string | null;
    price: number | null;
    point: number | null;
}

export interface MissionListResponse {
    data: MissionItem[];
    pagination: {
        cursor: number | null;
    };
}