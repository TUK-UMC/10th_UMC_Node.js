import { prisma } from "../../db.config.js";
import { MissionCreate, MissionRestaurantCreate } from "./mission.dto.js";

export const addMission = async (data: MissionCreate): Promise<number> => {
  const result = await prisma.mission.create({
    data: {
      missionTitle: data.title,
      missionContent: data.content,
      missionPoint: data.point,
      missionType: data.type,
    },
  });
  return Number(result.missionId);
};

export const addMissionRestaurant = async (data: MissionRestaurantCreate & { missionId: number }): Promise<number> => {
  const result = await prisma.missionRestaurant.create({
    data: {
      missionId: BigInt(data.missionId),
      restaurantId: BigInt(data.restaurantId),
    },
  });
  return Number(result.missionRestaurantId);
};

export const getMission = async (missionId: number) => {
  return await prisma.mission.findUnique({ where: { missionId: BigInt(missionId) } });
};

export const getMissionRestaurant = async (missionId: number) => {
  return await prisma.missionRestaurant.findUnique({ where: { missionId: BigInt(missionId) } });
};

export const getRestaurantById = async (restaurantId: number) => {
  return await prisma.restaurant.findUnique({ where: { restaurantId: BigInt(restaurantId) } });
};

export const getMissionsByRestaurantId = async (restaurantId: number) => {
  return await prisma.missionRestaurant.findMany({
    where: { restaurantId: BigInt(restaurantId) },
    include: { mission: true, restaurant: true },
  });
};
