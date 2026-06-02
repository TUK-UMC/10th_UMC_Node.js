import * as repo from "./restaurant.repository.js";
import { responseFromReviews, ReviewListResponse, MissionListResponse, responseFromMissions } from "./restaurant.dto.js";


export const createReviewService = async (
    userId: bigint,
    restaurantId: bigint,
    content: string,
    star: number
) => {
    console.log("[createReviewService] start", {
        userId,
        restaurantId,
        content,
        star
    });

    if (userId <= 0n) {
        console.error("[createReviewService] userId is invalid", {
            userId
        });
        throw new Error("INVALID_USER_ID");
    }

    if (restaurantId <= 0n) {
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
    restaurantId: bigint,
    name: string,
    price: number | null,
    point: number | null
) => {
    // 1. 식당 존재 확인
    const restaurant = await repo.findRestaurant(restaurantId);

    if (!restaurant) {
        throw new Error("RESTAURANT_NOT_EXIST");
    }

    // 2. 미션 생성
    return await repo.createMission(restaurantId, name, price, point);
};

export const listRestaurantReviewsService = async (
    restaurantId: bigint,
    cursor: number
): Promise<ReviewListResponse> => {
    const reviews = await repo.getAllRestaurantReviews(restaurantId, cursor);
    return responseFromReviews(reviews, cursor);
};

export const listRestaurantMissionsService = async (
    restaurantId: bigint,
    cursor: number
): Promise<MissionListResponse> => {
    const missions = await repo.getAllRestaurantMissions(restaurantId, cursor);
    return responseFromMissions(missions, cursor);
};