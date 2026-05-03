import { prisma } from "../../../db.config.js";

export const addRestaurant = async (data: {
  restaurantName: string;
  restaurantAddress: string;
  regionId: number;
  foodCategoryId: number;
}): Promise<number> => {
  const result = await prisma.restaurant.create({
    data: {
      restaurantName: data.restaurantName,
      restaurantAddress: data.restaurantAddress,
      regionId: BigInt(data.regionId),
      foodCategoryId: BigInt(data.foodCategoryId),
    },
  });
  return Number(result.restaurantId);
};

export const getRestaurant = async (restaurantId: number) => {
  return await prisma.restaurant.findUnique({ where: { restaurantId: BigInt(restaurantId) } });
};

export const getRegionById = async (regionId: number) => {
  return await prisma.region.findUnique({ where: { regionId: BigInt(regionId) } });
};

export const getFoodCategoryById = async (foodCategoryId: number) => {
  return await prisma.foodCategory.findUnique({ where: { foodCategoryId: BigInt(foodCategoryId) } });
};
