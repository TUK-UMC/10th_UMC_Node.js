export interface ReviewCreateRequest{
    userId:number;
    restaurantId:number;
    review_title:string;
    review_content:string;
    score:number;
}

export const responseFromReview =({
    review,restaurant,user}:{review:any;restaurant:any,user:any})=>{
    return {
        author_id: user.user_id,
        author_name : user.username,
        restaurant_name : restaurant.name,
        restaurant_address : restaurant.address,
        review_id : review.id,
        review_content : review.content,
        review_title : review.title,
        score : review.score,
    }
}
