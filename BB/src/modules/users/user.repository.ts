import { prisma } from "../../db.config.js";
import { Gender } from "../../generated/prisma/enums.js";
import type { Gender as GenderType } from "../../generated/prisma/enums.js";

interface AddUserRequest {
    email: string;
    name: string;
    gender: string;
    birth: Date;
    address?: string;
    phone: string;
}

const isGender = (gender: string): gender is GenderType => {
    return Object.values(Gender).includes(gender as GenderType);
};

export const addUser = async (data: AddUserRequest) => {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (user) {
        return null;
    }

    if (!isGender(data.gender)) {
        throw new Error("INVALID_GENDER");
    }

    const created = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            gender: data.gender,
            birth: data.birth,
            address: data.address,
            phone: data.phone,
        },
    });

    return created.id;
};

export const getUser = async (userId: number) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            gender: true,
            birth: true,
            address: true,
            phone: true,
        }
    });
};

export const setPreference = async (userId: number, preferences: number[]) => {
    await prisma.userPreference.createMany({
        data: preferences.map(categoryId => ({
            userId,
            categoryId
        })),
    });
};

export const getUserPreferencesByUserId = async (userId: number) => {
    return await prisma.userPreference.findMany({
        where: { userId },
        include: {
            category: true,
        },
        orderBy: { categoryId: "asc" },
    });
};

export const findMission = async (missionId: number) => {
    return await prisma.mission.findUnique({
        where: { id: missionId },
        select: {
            id: true,
            restaurantId: true,
        }
    });
};

export const findOngoingMission = async (userId: number, missionId: number) => {
    return await prisma.complete.findFirst({
        where: {
            userId,
            missionId,
            isCompleted: false,
        },
        select: {
            id: true,
        }
    });
};

export const insertChallenge = async (
    userId: number,
    missionId: number,
    restaurantId: number
) => {
    await prisma.complete.create({
        data: {
            userId,
            missionId,
            restaurantId,
            isCompleted: false,
        },
    });
};

export const getAllUserReviews = async (
    userId: number,
    cursor: number
) => {
    const take = 5;

    return await prisma.review.findMany({
        select: {
            id: true,
            content: true,
            restaurantId: true,
            userId: true,
            star: true,
        },
        where: {
            userId,
        },
        orderBy: {
            id: "asc",
        },
        skip: cursor * take,
        take,
    });
};

export const getAllUserMissions = async (
    userId: number,
    cursor: number
) => {
    const take = 5;

    const completes = await prisma.complete.findMany({
        select: {
            mission: {
                select: {
                    id: true,
                    restaurantId: true,
                    price: true,
                    point: true,
                },
            },
        },

        where: {
            userId,
        },

        orderBy: {
            id: "asc",
        },

        skip: cursor * take,
        take,
    });

    return completes.map((complete) => complete.mission);
};
