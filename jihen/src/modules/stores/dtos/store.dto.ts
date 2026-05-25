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