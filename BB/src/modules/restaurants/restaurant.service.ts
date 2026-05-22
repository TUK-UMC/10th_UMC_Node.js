import * as repo from "./restaurant.repository.js";
import { responseFromReviews, ReviewListResponse, MissionListResponse, responseFromMissions, CreateReviewDto } from "./restaurant.dto.js";
import { RestaurantNotFoundError, ReviewAlreadyExistsError } from "../../common/errors/error.js";

export const createReviewService = async (
    restaurantId: number,
    data: CreateReviewDto
): Promise<ReviewListResponse> => {
    const { userId } = data;

    if (!Number.isSafeInteger(userId) || userId <= 0) {
        console.error("[createReviewService] userId is invalid", {
            userId: data.userId
        });
        throw new Error("INVALID_USER_ID");
    }

    if (!Number.isSafeInteger(restaurantId) || restaurantId <= 0) {
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
        throw new RestaurantNotFoundError("존재하지 않는 식당입니다.", { restaurantId });
    }

    const exist = await repo.findReview(userId);
    console.log("[createReviewService] existing review lookup result", {
        exists: !!exist,
        userId: data.userId
    });
    if (exist) {
        throw new ReviewAlreadyExistsError("이미 작성한 리뷰가 있습니다.", { userId: data.userId });
    }

    await repo.createReview(userId, restaurantId, data.content, data.star);
    console.log("[createReviewService] review created", {
        userId: data.userId,
        restaurantId
    });

    const reviews = await repo.getAllRestaurantReviews(restaurantId, 0);
    return responseFromReviews(reviews, 0);
};



export const createMissionService = async (
    restaurantId: number,
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
    restaurantId: number,
    cursor: number
): Promise<ReviewListResponse> => {
    const reviews = await repo.getAllRestaurantReviews(restaurantId, cursor);
    return responseFromReviews(reviews, cursor);
};

export const listRestaurantMissionsService = async (
    restaurantId: number,
    cursor: number
): Promise<MissionListResponse> => {
    const missions = await repo.getAllRestaurantMissions(restaurantId, cursor);
    return responseFromMissions(missions, cursor);
};
