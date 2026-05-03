import { userMissionStartRequest, responseToUserMission, responseFromUserRestaurantMissions, responseFromActiveUserMissions } from "../dtos/userMission.dto.js";
import { addUserMission, getUserMission, getMissionById, getUserById, getRestaurantMissionbyUserId, getActiveUserMissions, getUserMissionById, updateUserMissionStatus } from "../repositories/userMission.repository.js";
import { UserMissionStatus } from "../../../generated/prisma/enums.js";

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

export const getUserRestaurantMission = async (userId : number) => {
    const userRestaurantMission = await getRestaurantMissionbyUserId(userId);
    return responseFromUserRestaurantMissions(userRestaurantMission)
}

export const getActiveUserMission = async (userId : number ) => {
    const activeUserMissions = await getActiveUserMissions(userId)
    return responseFromActiveUserMissions(activeUserMissions)

}

export const completeUserMission = async (userMissionId: number, userId: number) => {
    const userMission = await getUserMissionById(userMissionId);

    if (Number(userMission!.userId) !== userId) {
        const error = new Error("해당 미션에 대한 권한이 없습니다.");
        (error as any).statusCode = 403;
        throw error;
    }

    if (userMission!.userMissionStatus !== UserMissionStatus.ACTIVE) {
        const error = new Error("ACTIVE 상태의 미션만 완료할 수 있습니다.");
        (error as any).statusCode = 400;
        throw error;
    }

    return await updateUserMissionStatus(userMissionId, UserMissionStatus.COMPLETED);
};