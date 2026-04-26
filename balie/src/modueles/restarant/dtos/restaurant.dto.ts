export interface RestaurantCreateRequest{
    restaurantName: string;
    restaurantAddress: string;
    regionId:number;
    foodCategoryId:number;
}

export const responseFromRestaurant = ({
    restaurant,region,foodCategory,}: {
    restaurant: any;
    region: any;
    foodCategory: any;
}) => {
    return {
        restaurantId: restaurant.restaurant_id,
        restaurantName: restaurant.restaurant_name,
        restaurantAddress: restaurant.restaurant_address,
        regionName: region.region_name,
        foodCategoryName: foodCategory.name,
    };
};

export const bodyToRestaurant = (body:RestaurantCreateRequest) => {
    return {
        restaurantName: body.restaurantName,
        restaurantAddress: body.restaurantAddress,
        regionId: body.regionId,
        foodCategoryId: body.foodCategoryId,
    }
}