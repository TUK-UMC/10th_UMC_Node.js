import { ReviewCreateRequest, ReviewCreateResponse, reviewInfoDTO } from "./review.dto.js";
import { addReview, getReview, getUserById, getRestaurantById, getReviewsByUserId } from "./review.repository.js";
import { AppError } from "../../common/error/app.error.js";
import { RestaurantNotFoundError, ReviewCreateError, UserNotFoundError } from "../../common/error/error.js";

export const reviewAdd = async (data: ReviewCreateRequest, restaurantId: number): Promise<ReviewCreateResponse> => {
    try {
        const restaurant = await getRestaurantById(restaurantId);
        if (!restaurant) {
            throw new RestaurantNotFoundError("존재하지 않는 식당입니다", data);
        }

        const reviewId = await addReview(data, restaurantId);
        const review = await getReview(reviewId);
        if (!review) {
            throw new ReviewCreateError("리뷰 작성에 실패했습니다");
        }

        const user = await getUserById(data.userId);

        return {
            authorId: Number(user!.userId),
            authorName: user!.name,
            restaurantId: Number(restaurant.restaurantId),
            restaurantName: restaurant.restaurantName,
            reviewId: Number(review.reviewId),
            reviewContent: review.reviewContent,
            reviewTime: new Date().toISOString(),
            reviewScore: review.score,
        };
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new ReviewCreateError("리뷰 등록 중 오류가 발생했습니다");
    }
};

export const getUserReviews = async (userId: number): Promise<reviewInfoDTO[]> => {
    try {
        const user = await getUserById(userId);
        if (!user) {
            throw new UserNotFoundError("존재하지 않는 유저입니다");
        }

        const reviews = await getReviewsByUserId(userId);
        return reviews.map((review) => ({
            reviewId: Number(review.reviewId),
            authorId: Number(review.userId),
            authorName: review.user.name,
            restaurantId: Number(review.restaurantId),
            restaurantName: review.restaurant.restaurantName,
            reviewTitle: review.reviewTitle,
            reviewContent: review.reviewContent,
            reviewScore: review.score,
        }));
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new ReviewCreateError("리뷰 조회 중 오류가 발생했습니다");
    }
};
