export interface AddStoreRequest {
  /** 지역 ID */
  regionId: number;
  /** 가게 이름 */
  name: string;
  /** 가게 주소 */
  address: string;
  /** 카테고리 (예: 1=한식, 2=중식) */
  category: number;
}
export interface AddStoreResponse {
  /** 생성된 가게 ID */
  storeId: number;
}

export interface AddReviewRequest {
  /** 리뷰 작성자 멤버 ID */
  memberId: number;
  /** 리뷰 본문 */
  body: string;
  /** 평점 (1.0 ~ 5.0) */
  score: number;
}
export interface AddReviewResponse {
  /** 생성된 리뷰 ID */
  reviewId: number;
}

export interface AddMissionRequest {
  /** 미션 제목 */
  title: string;
  /** 미션 설명 */
  description?: string;
  /** 완료 시 지급 포인트 */
  rewardPoint: number;
  /** 미션 시작일 (예: 2025-01-01) */
  startAt?: string;
  /** 미션 종료일 (예: 2025-12-31) */
  endAt?: string;
}
export interface AddMissionResponse {
  /** 생성된 미션 ID */
  missionId: number;
}

export interface ChallengeMissionRequest {
  /** 도전하는 멤버 ID */
  memberId: number;
}
export interface ChallengeMissionResponse {
  /** 생성된 멤버미션 ID */
  challengeId: number;
}

export interface MissionItem {
  /** 미션 ID */
  missionId: number;
  /** 미션 제목 */
  title: string;
  /** 미션 설명 */
  description: string | null;
  /** 완료 시 지급 포인트 */
  rewardPoint: number;
  /** 미션 시작일 */
  startAt: Date | null;
  /** 미션 종료일 */
  endAt: Date | null;
}

export interface ReviewStoreInfo { [key: string]: unknown; }
export interface ReviewUserInfo { [key: string]: unknown; }

export interface ReviewItem {
  /** 리뷰 ID */
  id: number;
  /** 리뷰 본문 */
  content: string;
  /** 가게 정보 */
  store: ReviewStoreInfo;
  /** 작성자 정보 */
  user: ReviewUserInfo;
}
export interface ReviewsResponse {
  /** 리뷰 목록 */
  data: ReviewItem[];
  /** 페이지네이션 정보 */
  pagination: { cursor: number | null };
}

export interface OngoingMissionItem {
  /** 멤버미션 ID */
  membermissionId: number;
  /** 미션 상태 */
  status: number;
  /** 미션 정보 */
  mission: {
    missionId: number;
    title: string;
    store: { storeId: number; name: string };
  };
}

export interface CompleteMissionResponse {
  /** 완료된 멤버미션 ID */
  membermissionId: number;
  /** 변경된 상태 */
  status: number;
  /** 완료 시각 */
  completedAt: Date | null;
}
