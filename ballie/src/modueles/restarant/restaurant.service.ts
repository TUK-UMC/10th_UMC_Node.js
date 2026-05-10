import { RestaurantCreateRequest, RestaurantCreateResponse } from "./restaurant.dto.js";
import { addRestaurant, getRestaurant, getRegionById, getFoodCategoryById } from "./restaurant.repository.js";
import { AppError } from "../../common/error/app.error.js";
import { RestaurantCreateError, RegionNotFoundError, FoodCategoryNotFoundError } from "../../common/error/error.js";

export const restaurantAdd = async (data: RestaurantCreateRequest): Promise<RestaurantCreateResponse> => {
    try {
        const region = await getRegionById(data.regionId);
        if (!region) {
            throw new RegionNotFoundError("존재하지 않는 지역입니다", data);
        }

        const foodCategory = await getFoodCategoryById(data.foodCategoryId);
        if (!foodCategory) {
            throw new FoodCategoryNotFoundError("존재하지 않는 카테고리입니다", data);
        }

        const restaurantId = await addRestaurant({
            restaurantName: data.restaurantName,
            regionId: data.regionId,
            foodCategoryId: data.foodCategoryId,
        });

        const restaurant = await getRestaurant(restaurantId);
        if (!restaurant) {
            throw new RestaurantCreateError("식당 등록에 실패했습니다");
        }

        return {
            restaurantId: Number(restaurant.restaurantId),
            restaurantName: restaurant.restaurantName,
            regionName: region.regionName,
            foodCategory: [foodCategory.categoryName],
        };
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new RestaurantCreateError("식당 등록 중 오류가 발생했습니다");
    }
};
