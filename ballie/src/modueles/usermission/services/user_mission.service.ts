import { userMissionStartRequest, responseToUserMission } from "../dtos/userMission.dto.js";
import { addUserMission, getUserMission, getMissionById, getUserById } from "../repositories/user_mission.repository.js";

export const userMissionAdd = async (data: userMissionStartRequest) => {
    const mission = await getMissionById(data.missionId);
    if (!mission) {
        const error = new Error("존재하지 않는 미션입니다.");
        (error as any).statusCode = 404;
        throw error;
    }

    const userMissionId = await addUserMission(data);
    const userMission = await getUserMission(userMissionId);
    const user = await getUserById(data.userId);

    return responseToUserMission({ userMission, mission, user });
};
