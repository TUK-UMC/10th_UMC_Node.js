export interface ReviewCreateRequest {
    userId: number;
    reviewTitle: string;
    reviewContent: string;
    score: number;
}

export interface ReviewCreateResponse {
    authorId : number;
    authorName : string;
    restaurantId : number;
    restaurantName : string;
    reviewId : number;
    reviewContent : string;
    reviewTime : string;
    reviewScore : number;
}

export interface reviewInfoDTO{
    reviewId : number
    authorId: number
    authorName : string
    restaurantId : number
    restaurantName : string
    reviewTitle:string
    reviewContent:string
    reviewScore:number
}

