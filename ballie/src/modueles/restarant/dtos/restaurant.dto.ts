export interface RestaurantCreateRequest {
    restaurantName: string;
    restaurantAddress: string;
    regionId: number;
    foodCategoryId: number;
}

export const responseFromRestaurant = ({
    restaurant, region, foodCategory,
}: {
    restaurant: any;
    region: any;
    foodCategory: any;
}) => {
    return {
        restaurantId: Number(restaurant.restaurantId),
        restaurantName: restaurant.restaurantName,
        restaurantAddress: restaurant.restaurantAddress,
        regionName: region.regionName,
        foodCategoryName: foodCategory.categoryName,
    };
};

export const bodyToRestaurant = (body: RestaurantCreateRequest) => {
    return {
        restaurantName: body.restaurantName,
        restaurantAddress: body.restaurantAddress,
        regionId: body.regionId,
        foodCategoryId: body.foodCategoryId,
    };
};

