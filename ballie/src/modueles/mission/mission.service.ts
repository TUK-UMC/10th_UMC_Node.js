import { MissionRestaurantCreateRequest, MissionRestaurantCreateResponse, RestaurantMissionDTO } from "./mission.dto.js";
import { addMission, addMissionRestaurant, getMission, getMissionRestaurant, getMissionsByRestaurantId, getRestaurantById } from "./mission.repository.js";
import { AppError } from "../../common/error/app.error.js";
import { MissionCreateError, RestaurantNotFoundError } from "../../common/error/error.js";

export const restaurantMissionAdd = async (data: MissionRestaurantCreateRequest, restaurantId: number): Promise<MissionRestaurantCreateResponse> => {
    try {
        const restaurant = await getRestaurantById(restaurantId);
        if (!restaurant) {
            throw new RestaurantNotFoundError("존재하지 않는 식당입니다.");
        }

        const joinMissionId = await addMission({
            point: data.point,
            title: data.title,
            content: data.content,
            type: 'RESTAURANT',
        });

        await addMissionRestaurant({ missionId: joinMissionId, restaurantId });

        const mission = await getMission(joinMissionId);
        const missionRestaurant = await getMissionRestaurant(joinMissionId);

        if (!mission || !missionRestaurant) {
            throw new MissionCreateError("미션 등록에 실패했습니다");
        }

        return {
            missionId: Number(mission.missionId),
            restaurantId: Number(missionRestaurant.restaurantId),
            point: mission.missionPoint,
            title: mission.missionTitle,
            content: mission.missionContent,
            type: mission.missionType,
            missionRestaurantId: Number(missionRestaurant.missionRestaurantId),
        };
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new MissionCreateError("미션 등록 중 오류가 발생했습니다");
    }
};

export const getRestaurantMissions = async (restaurantId: number): Promise<RestaurantMissionDTO[]> => {
    try {
        const restaurant = await getRestaurantById(restaurantId);
        if (!restaurant) {
            throw new RestaurantNotFoundError("존재하지 않는 식당입니다.");
        }

        const missions = await getMissionsByRestaurantId(restaurantId);
        return missions.map((m) => ({
            missionId: Number(m.mission.missionId),
            missionTitle: m.mission.missionTitle,
            missionContent: m.mission.missionContent,
            missionPoint: m.mission.missionPoint,
            missionType: m.mission.missionType,
            restaurantId: Number(m.restaurant.restaurantId),
            restaurantName: m.restaurant.restaurantName,
        }));
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new RestaurantNotFoundError("식당 미션 조회 중 오류가 발생했습니다");
    }
};
