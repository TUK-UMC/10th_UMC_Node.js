export interface ReviewCreateRequest {
    userId: number;
    restaurantId: number;
    reviewTitle: string;
    reviewContent: string;
    score: number;
}

export const responseFromReview = ({
    review, restaurant, user,
}: {
    review: any;
    restaurant: any;
    user: any;
}) => {
    return {
        authorId: Number(user.userId),
        authorName: user.name,
        restaurantName: restaurant.restaurantName,
        restaurantAddress: restaurant.restaurantAddress,
        reviewId: Number(review.reviewId),
        reviewTitle: review.reviewTitle,
        reviewContent: review.reviewContent,
        score: review.score,
    };
};

export interface reviewInfoDTO{
    reviewId : number
    authorId: number
    authorName : string
    restaurantId : number
    restauantName : string
    reviewTitle:string
    reviewContent:string
    reviewscore:number

}

export const responseFromUserReviews = (reviews: any[]): reviewInfoDTO[] => {
    return reviews.map((review) => ({
        reviewId: Number(review.reviewId),
        authorId: Number(review.userId),
        authorName: review.user.name,
        restaurantId: Number(review.restaurantId),
        restauantName: review.restaurant.restaurantName,
        reviewTitle: review.reviewTitle,
        reviewContent: review.reviewContent,
        reviewscore: review.score,
    }));
};
