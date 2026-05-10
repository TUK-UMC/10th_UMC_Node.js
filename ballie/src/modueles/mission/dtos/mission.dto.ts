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

export interface MissionRestaurantCreate{
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

export const responseFromMissionRestaurant = ({
    mission,
    missionRestaurant,
}: {
    mission: any;
    missionRestaurant: any;
}) => {
    return {
        missionId: mission.mission_id,
        restaurantId: mission.restaurant_id,
        point: mission.point,
        title: mission.title,
        content: mission.content,
        type: mission.type,
        missionRestaurantId: missionRestaurant.mission_restaurant_id,
    };
};
