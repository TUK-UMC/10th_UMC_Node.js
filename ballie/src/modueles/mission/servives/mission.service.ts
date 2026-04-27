import {
    bodyToMission,
    responseFromMissionRestaurant,
} from "../dtos/mission.dto.js";
import {
    addMission,
    addMissionRestaurant,
    getMission,
    getMissionRestaurant,
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
