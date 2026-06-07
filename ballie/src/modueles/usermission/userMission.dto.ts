/** 유저 미션 생성 요청 응답 body*/
export interface UserMissionStartResponse {
    /** 생성된 유저-미션 id */
    userMissionId: number;
    /** 유저의 미션 상태 */
    userMissionStatus: string;
    /** 유저 ID */
    userId: number;
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
}

/** 유저 - 식당미션 정보 DTO */
export interface UserRestaurantMissionDTO {
    /** 유저-미션 ID */
    userMissionId: number;
    /** 미션 ID */
    missionId: number;
    /** 미션 제목 */
    missionTitle: string;
    /** 미션 내용 */
    missionContent: string;
    /** 미션 달성 포인트 */
    missionPoint: number;
    /** 식당 ID */
    restaurantId: number;
    /** 식당 이름 */
    restaurantName: string;
    /** 미션 진행 상태 */
    missionStatus: string;
}

/** 도전중인 미션 목록 DTO */
export interface ActiveUserMissionDTO {
    /** 미션 ID */
    missionId: number;
    /** 유저-미션 ID */
    userMissionId: number;
    /** 미션 제목 */
    missionTitle: string;
    /** 미션 내용 */
    missionContent: string;
    /** 미션 달성 포인트 */
    missionPoint: number;
}

export interface CompleteUserMissionDTO {
    userMissionId: number;
    userId: number;
    missionId: number;
    userMissionStatus: string;
}
