import { RestaurantCreateRequest, responseFromRestaurant } from "../dtos/restaurant.dto.js";
import {
    addRestaurant,
    getRestaurant,
    getRegionById,
    getFoodCategoryById,
} from "../repositories/restaurant.repository.js";

export const restaurantAdd = async (data: RestaurantCreateRequest) => {
    const restaurantId = await addRestaurant({
        restaurantName: data.restaurantName,
        restaurantAddress: data.restaurantAddress,
        regionId: data.regionId,
        foodCategoryId: data.foodCategoryId,
    });

    const restaurant = await getRestaurant(restaurantId);
    const region = await getRegionById(data.regionId);
    const foodCategory = await getFoodCategoryById(data.foodCategoryId);

    return responseFromRestaurant({ restaurant, region, foodCategory });
};
