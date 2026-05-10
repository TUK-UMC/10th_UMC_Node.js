import {
    bodyToMission,
    responseFromMissionRestaurant,
    responseFromRestaurantMissions,
} from "../dtos/mission.dto.js";
import {
    addMission,
    addMissionRestaurant,
    getMission,
    getMissionRestaurant,
    getMissionsByRestaurantId,
} from "../repositories/mission.repository.js";

export const restaurantMissionAdd = async (data: ReturnType<typeof bodyToMission>) => {
    const joinMissionId = await addMission({
        point: data.point,
        title: data.title,
        content: data.content,
        type: data.type,
    });

    await addMissionRestaurant({ missionId: joinMissionId, restaurantId: data.restaurantId });

    const mission = await getMission(joinMissionId);
    const missionRestaurant = await getMissionRestaurant(joinMissionId);

    return responseFromMissionRestaurant({ mission, missionRestaurant });
};

export const getRestaurantMissions = async (restaurantId: number) => {
    const missions = await getMissionsByRestaurantId(restaurantId);
    return responseFromRestaurantMissions(missions);
};
