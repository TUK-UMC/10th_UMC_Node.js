/** 리뷰 생성 요청 */
export interface ReviewCreateRequest {
  /** 리뷰 제목 */
  reviewTitle: string;
  /** 리뷰 내용 */
  reviewContent: string;
  /** 평점 (0.0 ~ 5.0) */
  score: number;
}

/** 리뷰 생성 응답 */
export interface ReviewCreateResponse {
  /** 작성자 Id */
  authorId: number;
  /** 작성자 이름 */
  authorName: string;
  /** 식당 ID */
  restaurantId: number;
  /** 식당 이름 */
  restaurantName: string;
  /** 생성된 리뷰 ID */
  reviewId: number;
  /** 리뷰 내용 */
  reviewContent: string;
  /** 리뷰 작성 시각 (ISO 8601) */
  reviewTime: string;
  /** 평점 */
  reviewScore: number;
}

/** 리뷰 목록 조회 DTO */
export interface reviewInfoDTO {
  reviewId: number;
  authorId: number;
  authorName: string;
  restaurantId: number;
  restaurantName: string;
  reviewTitle: string;
  reviewContent: string;
  reviewScore: number;
}
