export interface MissionRestaurantCreateRequest {
    restaurantId: number;
    point: number;
    title: string;
    content: string;
}

export interface MissionCreate {
    point: number;
    title: string;
    content: string;
    type: 'RESTAURANT' | 'REGION';
}

export interface MissionRestaurantCreate {
    restaurantId: number;
}

export const bodyToMissionCreate = (body: MissionRestaurantCreateRequest): MissionCreate => {
    return {
        point: body.point,
        title: body.title,
        content: body.content,
        type: 'RESTAURANT',
    };
};

export const bodyToMissionRestaurantCreate = (body: MissionRestaurantCreateRequest): MissionRestaurantCreate => {
    return {
        restaurantId: body.restaurantId,
    };
};

export const bodyToMission = (body: MissionRestaurantCreateRequest) => {
    return {
        ...bodyToMissionCreate(body),
        ...bodyToMissionRestaurantCreate(body),
    };
};

export interface restaurantMissionDTO {
    missionId: number;
    missionTitle: string;
    missionContent: string;
    missionPoint: number;
    missionType: string;
    restaurantId: number;
    restaurantName: string;
}

export const responseFromRestaurantMissions = (missions: any[]): restaurantMissionDTO[] => {
    return missions.map((m) => ({
        missionId: Number(m.mission.missionId),
        missionTitle: m.mission.missionTitle,
        missionContent: m.mission.missionContent,
        missionPoint: m.mission.missionPoint,
        missionType: m.mission.missionType,
        restaurantId: Number(m.restaurant.restaurantId),
        restaurantName: m.restaurant.restaurantName,
    }));
};

export const responseFromMissionRestaurant = ({
    mission,
    missionRestaurant,
}: {
    mission: any;
    missionRestaurant: any;
}) => {
    return {
        missionId: Number(mission.missionId),
        restaurantId: Number(missionRestaurant.restaurantId),
        point: mission.missionPoint,
        title: mission.missionTitle,
        content: mission.missionContent,
        type: mission.missionType,
        missionRestaurantId: Number(missionRestaurant.missionRestaurantId),
    };
};

