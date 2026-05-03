
import { UserMissionStatus } from "../../../generated/prisma/enums.js";

export interface userMissionStartRequest {
    userId: number;
    missionId: number;
}

export const responseToUserMission = ({
    user,
    mission,
    userMission,
}: {
    user: any;
    mission: any;
    userMission: any;
}) => {
    return {
        userMissionId: Number(userMission.userMissionId),
        userMissionStatus: userMission.userMissionStatus,
        userId: Number(user.userId),
        missionId: Number(mission.missionId),
        missionTitle: mission.missionTitle,
        missionContent: mission.missionContent,
        missionPoint: mission.missionPoint,
        missionType: mission.missionType,
    };
};

export interface usersRestaurantMissionDTO{
    userMissionId : number
    missionId : number
    missionTitle : string
    missionContent : string
    missionPoint : number
    restaurantId : number
    restaurantName : string
    missionStatus : UserMissionStatus
}

//내 식당 미션 보기 기능 -> 미션 잘못보고 만들어버렸습니다
export const responseFromUserRestaurantMissions = (userRestaurantMission : any[]) : usersRestaurantMissionDTO[] => {
    return userRestaurantMission.map((userRestaurantMission) => ({
        userMissionId: Number(userRestaurantMission.userMissionId),
        missionId : Number(userRestaurantMission.mission.missionId),
        missionTitle : userRestaurantMission.mission.missionTitle,
        missionContent : userRestaurantMission.mission.missionContent,
        missionPoint : userRestaurantMission.mission.missionPoint,
        restaurantId : Number(userRestaurantMission.mission.missionRestaurant.restaurantId),
        restaurantName : userRestaurantMission.mission.missionRestaurant.restaurant.restaurantName,
        missionStatus : userRestaurantMission.userMissionStatus
    }));
}

export interface activeUserMissionDTO{
    missionId : number
    userMissionId : number
    missionTitle : string
    missionContent : string
    missionPoint : number
}

export const responseFromActiveUserMissions =(aum : any[]): activeUserMissionDTO[]=>{
    return aum.map((aum)=>({
        missionId : Number(aum.missionId),
        userMissionId : Number(aum.userMissionId),
        missionTitle : aum.mission.missionTitle,
        missionContent : aum.mission.missionContent,
        missionPoint : aum.mission.missionPoint

    }))
}

