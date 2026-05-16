/** 식당 미션 생성 요청 body */
export interface MissionRestaurantCreateRequest {
    /** 미션 달성 포인트 */
    point: number;
    /** 미션 제목 */
    title: string;
    /** 미션 내용 */
    content: string;
}

/** 식당 미션 생성 응답 */
export interface MissionRestaurantCreateResponse {
    /** 생성된 미션 ID */
    missionId: number;
    /** 식당 ID */
    restaurantId: number;
    /** 미션 달성 포인트 */
    point: number;
    /** 미션 제목 */
    title: string;
    /** 미션 내용 */
    content: string;
    /** 미션 종류 */
    type: string;
    /** 생성된 식당-미션 연결 ID */
    missionRestaurantId: number;
}

/** 식당 미션 목록 조회 DTO */
export interface RestaurantMissionDTO {
    /** 미션 ID */
    missionId: number;
    /** 미션 제목 */
    missionTitle: string;
    /** 미션 내용 */
    missionContent: string;
    /** 미션 달성 포인트 */
    missionPoint: number;
    /** 미션 종류 */
    missionType: string;
    /** 식당 ID */
    restaurantId: number;
    /** 식당 이름 */
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
