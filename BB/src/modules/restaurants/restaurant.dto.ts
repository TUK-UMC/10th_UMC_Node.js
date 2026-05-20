export interface CreateReviewDto {
    userId: string;
    content: string;
    star: number;
}

export interface ReviewRow {
    id: bigint;
    userId: bigint;
    restaurantId: bigint | null;
    content: string | null;
    star: { toString(): string } | null;
}

export interface ReviewItem {
    id: string;
    userId: string;
    restaurantId: string | null;
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
    id: bigint;
    restaurantId: bigint | null;
    price: number | null;
    point: number | null;
}

export interface MissionItem {
    id: string;
    restaurantId: string | null;
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
            id: review.id.toString(),
            restaurantId: review.restaurantId?.toString() || null,
            userId: review.userId.toString(),
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
            id: mission.id.toString(),
            restaurantId: mission.restaurantId?.toString() || null,
            price: mission.price,
            point: mission.point,
        })),
        pagination: {
            cursor: missions.length === 5 ? cursor + 1 : null,
        },
    };
};
