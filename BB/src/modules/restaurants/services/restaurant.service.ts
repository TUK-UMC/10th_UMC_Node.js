import * as repo from "../repositories/restaurant.repository.js";

export const createReviewService = async (
    userId: number,
    restaurantId: number,
    content: string,
    star: number
) => {
    console.log("[createReviewService] start", {
        userId,
        restaurantId,
        content,
        star
    });

    if (Number.isNaN(userId) || userId <= 0) {
        console.error("[createReviewService] userId is invalid", {
            userId
        });
        throw new Error("INVALID_USER_ID");
    }

    if (Number.isNaN(restaurantId)) {
        console.error("[createReviewService] restaurantId is invalid", {
            restaurantId
        });
        throw new Error("INVALID_RESTAURANT_ID");
    }

    const restaurant = await repo.findRestaurant(restaurantId);
    console.log("[createReviewService] restaurant lookup result", {
        exists: !!restaurant,
        restaurantId
    });
    if (!restaurant) {
        throw new Error("RESTAURANT_NOT_EXIST");
    }

    const exist = await repo.findReview(userId);
    console.log("[createReviewService] existing review lookup result", {
        exists: !!exist,
        userId
    });
    if (exist) {
        throw new Error("REVIEW_ALREADY_EXISTS");
    }

    await repo.createReview(userId, restaurantId, content, star);
    console.log("[createReviewService] review created", {
        userId,
        restaurantId
    });
};

export const createMissionService = async (
    restaurantId: number,
    name: string,
    price: number,
    point: number
) => {
    // 1. 식당 존재 확인
    const restaurant = await repo.findRestaurant(restaurantId);

    if (!restaurant) {
        throw new Error("RESTAURANT_NOT_EXIST");
    }

    // 2. 미션 생성
    return await repo.createMission(restaurantId, name, price, point);
};