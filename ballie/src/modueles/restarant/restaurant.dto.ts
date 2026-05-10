export interface RestaurantCreateRequest {
    restaurantName: string;
    regionId: number;
    foodCategoryId: number;
}

export interface RestaurantCreateResponse {
    restaurantId : number
    restaurantName : string
    foodCategory : string[]
    regionName : string
}
