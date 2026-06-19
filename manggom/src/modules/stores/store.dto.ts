// 가게 추가 요청/응답
export interface StoreAddRequest {
  title: string;
  oneLine: string;
  place: string;
}
export interface StoreAddResponse {
  storeId: number;
}

// 리뷰 추가 요청/응답
export interface ReviewAddRequest {
  userId: number;
  detail: string;
  starScore: number;
}
export interface ReviewAddResponse {
  reviewId: number;
}

// 리뷰 아이템
export interface ReviewItem {
  id: number;
  userId: number;
  storeId: number;
  detail: string;
  starScore: number;
  createdAt: Date;
}

// 리뷰 목록 응답
export interface ReviewListResponse {
  data: ReviewItem[];
  pagination: {
    cursor: number | null;
  };
}

// 미션 추가 요청/응답
export interface MissionAddRequest {
  explanation: string;
}
export interface MissionAddResponse {
  missionId: number;
}

// 미션 도전 요청/응답
export interface UserMissionAddRequest {
  status: string;
}
export interface UserMissionAddResponse {
  userMissionId: number;
}