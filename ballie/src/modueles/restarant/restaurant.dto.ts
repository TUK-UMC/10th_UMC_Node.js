/** 식당 생성 요청 body */
export interface RestaurantCreateRequest {
    /** 식당 이름 */
    restaurantName: string;
    /** 지역 ID */
    regionId: number;
    /** 음식 카테고리 ID */
    foodCategoryId: number;
}

/** 식당 생성 응답 */
export interface RestaurantCreateResponse {
    /** 생성된 식당 ID */
    restaurantId: number;
    /** 식당 이름 */
    restaurantName: string;
    /** 음식 카테고리 이름 */
    foodCategory: string;
    /** 지역 이름 */
    regionName: string;
}
