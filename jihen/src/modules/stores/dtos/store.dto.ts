export interface AddStoreRequest {
  regionId: number;
  name: string;
  address: string;
  category: number;
}
export interface AddStoreResponse { storeId: number; }

export interface AddReviewRequest {
  memberId: number;
  body: string;
  score: number;
}
export interface AddReviewResponse { reviewId: number; }

export interface AddMissionRequest {
  title: string;
  description?: string;
  rewardPoint: number;
  startAt?: string;
  endAt?: string;
}
export interface AddMissionResponse { missionId: number; }

export interface ChallengeMissionRequest { memberId: number; }
export interface ChallengeMissionResponse { challengeId: number; }

export interface MissionItem {
  missionId: number;
  title: string;
  description: string | null;
  rewardPoint: number;
  startAt: Date | null;
  endAt: Date | null;
}
<<<<<<< feat/issue-30

export interface ReviewStoreInfo { [key: string]: unknown; }
export interface ReviewUserInfo { [key: string]: unknown; }

export interface ReviewItem {
  id: number;
  content: string;
  store: ReviewStoreInfo;
  user: ReviewUserInfo;
}
export interface ReviewsResponse {
  data: ReviewItem[];
  pagination: { cursor: number | null };
}

export interface OngoingMissionItem {
  membermissionId: number;
  status: number;
  mission: {
    missionId: number;
    title: string;
    store: { storeId: number; name: string };
  };
}

export interface CompleteMissionResponse {
  membermissionId: number;
  status: number;
  completedAt: Date | null;
}
