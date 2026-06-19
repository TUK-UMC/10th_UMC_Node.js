export interface AddStoreRequest {
  regionId: number;
  name: string;
  address: string;
  category: number;
}
export interface AddStoreResponse { storeId: number; }

export interface AddReviewRequest {
  body: string;
  score: number;
}
export interface AddReviewResponse { reviewId: number; }

export interface ReviewItem {
  reviewId: number;
  body: string;
  score: number;
  memberId: number;
  createdAt: Date;
}
export interface ReviewsResponse {
  data: ReviewItem[];
  pagination: { cursor: number | null };
}
