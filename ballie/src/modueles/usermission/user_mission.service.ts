import { UserMissionStartResponse, UserRestaurantMissionDTO, ActiveUserMissionDTO, CompleteUserMissionDTO } from "./userMission.dto.js";
import { addUserMission, getUserMission, getRestaurantMissionbyUserId, getActiveUserMissions, getUserMissionById, updateUserMissionStatus, getUserById } from "./userMission.repository.js";
import { UserMissionStatus } from "../../generated/prisma/enums.js";
import { getMission } from "../mission/mission.repository.js";
import { AppError } from "../../common/error/app.error.js";
import { MissionNotFoundError, UserNotFoundError, UserMissionNotFoundError, UserMissionStatusError } from "../../common/error/error.js";

export const userMissionAdd = async (userId: number, missionId: number): Promise<UserMissionStartResponse> => {
    try {
        const user = await getUserById(userId);
        if (!user) {
            throw new UserNotFoundError("존재하지 않는 유저입니다.", { userId });
        }

        const mission = await getMission(missionId);
        if (!mission) {
            throw new MissionNotFoundError("존재하지 않는 미션입니다.", { missionId });
        }

        const userMissionId = await addUserMission({ userId, missionId });
        const userMission = await getUserMission(userMissionId);

        return {
            userMissionId: Number(userMission!.userMissionId),
            userMissionStatus: userMission!.userMissionStatus,
            userId: Number(user.userId),
            missionId: Number(mission.missionId),
            missionTitle: mission.missionTitle,
            missionContent: mission.missionContent,
            missionPoint: mission.missionPoint,
            missionType: mission.missionType,
        };
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new UserMissionNotFoundError("유저미션 등록 중 오류가 발생했습니다");
    }
};

export const getUserRestaurantMission = async (userId: number): Promise<UserRestaurantMissionDTO[]> => {
    try {
        const user = await getUserById(userId);
        if (!user) {
            throw new UserNotFoundError("존재하지 않는 유저입니다.", { userId });
        }

        const userRestaurantMissions = await getRestaurantMissionbyUserId(userId);
        return userRestaurantMissions.map((um) => {
            if (!um.mission.missionRestaurant) {
                throw new MissionNotFoundError("식당과 연결되지 않은 미션 데이터입니다.", { missionId: Number(um.mission.missionId) });
            }
            return {
                userMissionId: Number(um.userMissionId),
                missionId: Number(um.mission.missionId),
                missionTitle: um.mission.missionTitle,
                missionContent: um.mission.missionContent,
                missionPoint: um.mission.missionPoint,
                restaurantId: Number(um.mission.missionRestaurant.restaurantId),
                restaurantName: um.mission.missionRestaurant.restaurant.restaurantName,
                missionStatus: um.userMissionStatus,
            };
        });
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new UserNotFoundError("유저 식당 미션 조회 중 오류가 발생했습니다");
    }
};

export const getActiveUserMission = async (userId: number): Promise<ActiveUserMissionDTO[]> => {
    try {
        const user = await getUserById(userId);
        if (!user) {
            throw new UserNotFoundError("존재하지 않는 유저입니다.", { userId });
        }

        const activeUserMissions = await getActiveUserMissions(userId);
        return activeUserMissions.map((aum) => ({
            missionId: Number(aum.missionId),
            userMissionId: Number(aum.userMissionId),
            missionTitle: aum.mission.missionTitle,
            missionContent: aum.mission.missionContent,
            missionPoint: aum.mission.missionPoint,
        }));
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new UserNotFoundError("진행중 미션 조회 중 오류가 발생했습니다");
    }
};

export const completeUserMission = async (userMissionId: number): Promise<void> => {
    try {
        const userMission = await getUserMissionById(userMissionId);
        if (!userMission) {
            throw new UserMissionNotFoundError("존재하지 않는 유저미션입니다.", { userMissionId });
        }

        if (userMission.userMissionStatus !== UserMissionStatus.ACTIVE) {
            throw new UserMissionStatusError("ACTIVE 상태의 미션만 완료할 수 있습니다.", { userMissionId, currentStatus: userMission.userMissionStatus });
        }

        await updateUserMissionStatus(userMissionId);
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new UserMissionNotFoundError("유저미션 완료 처리 중 오류가 발생했습니다");
    }
};
