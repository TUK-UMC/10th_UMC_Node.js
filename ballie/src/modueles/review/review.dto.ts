/** 리뷰 생성 요청 */
export interface ReviewCreateRequest {
    /** 작성자 ID -> 로그인 기능 구현되면 DTO에서 제거 */
    userId: number;
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
    authorId : number;
    /** 작성자 이름 */
    authorName : string;
    /** 식당 ID */
    restaurantId : number;
    /** 식당 이름 */
    restaurantName : string;
    /** 생성된 리뷰 ID */
    reviewId : number;
    /** 리뷰 내용 */
    reviewContent : string;
    /** 리뷰 작성 시각 (ISO 8601) */
    reviewTime : string;
    /** 평점 */
    reviewScore : number;
}

/** 리뷰 목록 조회 DTO */
export interface reviewInfoDTO{
    /** 리뷰 ID */
    reviewId : number
    /** 작성자 ID */
    authorId: number
    /** 작성자 이름 */
    authorName : string
    /** 식당 ID */
    restaurantId : number
    /** 식당 이름 */
    restaurantName : string
    /** 리뷰 제목 */
    reviewTitle:string
    /** 리뷰 내용 */
    reviewContent:string
    /** 평점 */
    reviewScore:number
}

