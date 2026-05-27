import type { Gender } from "../../generated/prisma/enums.js";

export interface UserSignUpRequest {
    email: string;
    name: string;
    gender: Gender;
    birth: Date;
    address?: string;
    phone: string;
    preferences: number[];
}

export interface UserSignUpResponse {
    userId: number;
    email: string;
    name: string;
    gender: Gender;
    birth: Date;
    address?: string;
    phone: string;
    preferences: string[];
}

export interface ChallengeMissionRequest {
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
