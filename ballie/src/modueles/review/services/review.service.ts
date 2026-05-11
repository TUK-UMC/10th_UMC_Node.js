import { ReviewCreateRequest, responseFromReview, responseFromUserReviews } from "../dtos/review.dots.js";
import { addReview, getReview, getUserById, getRestaurantById, getReviewsByUserId } from "../repositories/review.repository.js";

export const reviewAdd = async (data: ReviewCreateRequest) => {
    const restaurant = await getRestaurantById(data.restaurantId);
    if (!restaurant) {
        const error = new Error("존재하지 않는 가게입니다.");
        (error as any).statusCode = 404;
        throw error;
    }

    const reviewId = await addReview(data);
    const review = await getReview(reviewId);
    const user = await getUserById(data.userId);

    return responseFromReview({ review, restaurant, user });
};

export const getUserReviews = async (userId: number) => {
    const reviews = await getReviewsByUserId(userId);
    return responseFromUserReviews(reviews);
};
