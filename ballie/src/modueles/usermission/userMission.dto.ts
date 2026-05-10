export interface UserMissionStartResponse {
    userMissionId: number;
    userMissionStatus: string;
    userId: number;
    missionId: number;
    missionTitle: string;
    missionContent: string;
    missionPoint: number;
    missionType: string;
}

export interface UserRestaurantMissionDTO {
    userMissionId: number;
    missionId: number;
    missionTitle: string;
    missionContent: string;
    missionPoint: number;
    restaurantId: number;
    restaurantName: string;
    missionStatus: string;
}

export interface ActiveUserMissionDTO {
    missionId: number;
    userMissionId: number;
    missionTitle: string;
    missionContent: string;
    missionPoint: number;
}

export interface CompleteUserMissionDTO {
    userMissionId: number;
    userId: number;
    missionId: number;
    userMissionStatus: string;
}
