export interface MissionRestaurantCreateRequest {
    point: number;
    title: string;
    content: string;
}

export interface MissionRestaurantCreateResponse {
    missionId: number;
    restaurantId: number;
    point: number;
    title: string;
    content: string;
    type: string;
    missionRestaurantId: number;
}

export interface RestaurantMissionDTO {
    missionId: number;
    missionTitle: string;
    missionContent: string;
    missionPoint: number;
    missionType: string;
    restaurantId: number;
    restaurantName: string;
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
