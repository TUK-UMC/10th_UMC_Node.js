export interface CreateReviewDto {
    userId: number;
    content: string;
    star: number;
}

export interface ReviewRow {
    id: number;
    userId: number;
    restaurantId: number | null;
    content: string | null;
    star: { toString(): string } | null;
}

export interface ReviewItem {
    id: number;
    userId: number;
    restaurantId: number | null;
    content: string | null;
    star: string | null;
}

export interface ReviewListResponse {
    data: ReviewItem[];
    pagination: {
        cursor: number | null;
    };
}

export interface MissionRow {
    id: number;
    restaurantId: number | null;
    price: number | null;
    point: number | null;
}

export interface MissionItem {
    id: number;
    restaurantId: number | null;
    price: number | null;
    point: number | null;
}

export interface MissionListResponse {
    data: MissionItem[];
    pagination: {
        cursor: number | null;
    };
}





export const responseFromReviews = (
    reviews: ReviewRow[],
    cursor: number
): ReviewListResponse => {

    return {
        data: reviews.map((review) => ({
            ...review,
            id: review.id,
            restaurantId: review.restaurantId,
            userId: review.userId,
            content: review.content,
            star: review.star?.toString() || null,
        })),
        pagination: {
            cursor: reviews.length === 5 ? cursor + 1 : null,
        },
    };
};


export interface CreateReviewResponse {
    missions: MissionRow[],
    cursor: number
}

export const responseFromMissions = (
    missions: MissionRow[],
    cursor: number
): MissionListResponse => {

    return {
        data: missions.map((mission) => ({
            ...mission,
            id: mission.id,
            restaurantId: mission.restaurantId,
            price: mission.price,
            point: mission.point,
        })),
        pagination: {
            cursor: missions.length === 5 ? cursor + 1 : null,
        },
    };
};
