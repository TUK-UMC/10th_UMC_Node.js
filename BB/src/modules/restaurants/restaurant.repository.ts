import { prisma } from "../../db.config.js";

export const findMission = async (missionId: number) => {
    return await prisma.mission.findUnique({
        where: { id: missionId },
    });
};

export const findReview = async (userId: number) => {
    return await prisma.review.findFirst({
        where: { userId },
    });
};

export const createReview = async (
    userId: number,
    restaurantId: number,
    content: string,
    star: number
) => {
    await prisma.review.create({
        data: {
            restaurantId,
            userId,
            content,
            star,
            createdAt: new Date(),
        },
    });
};

export const createMission = async (
    restaurantId: number,
    name: string,
    price: number | null,
    point: number | null
) => {
    const mission = await prisma.mission.create({
        data: {
            restaurantId,
            price,
            point,
            createdAt: new Date(),
        },
    });

    return {
        missionId: mission.id,
        restaurantId,
        name,
        price,
        point,
    };
};

export const findRestaurant = async (restaurantId: number) => {
    return await prisma.restaurant.findUnique({
        where: { id: restaurantId },
    });
};

export const getAllRestaurantReviews = async (
    restaurantId: number,
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
            restaurantId,
        },
        orderBy: {
            id: "asc",
        },
        skip: cursor * take,
        take,
    });
};

export const getAllRestaurantMissions = async (
    restaurantId: number,
    cursor: number
) => {
    const take = 5;

    return await prisma.mission.findMany({
        select: {
            id: true,
            restaurantId: true,
            price: true,
            point: true,
        },
        where: {
            restaurantId,
        },
        orderBy: {
            id: "asc",
        },
        skip: cursor * take,
        take,
    });
};
