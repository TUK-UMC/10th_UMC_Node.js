export interface AddStoreRequest {
  regionId: number;
  name: string;
  address: string;
  category: number;
}

export interface AddReviewRequest {
  memberId: number;
  body: string;
  score: number;
}

export interface AddMissionRequest {
  title: string;
  description?: string;
  rewardPoint: number;
  startAt?: string;
  endAt?: string;
}

export interface ChallengeMissionRequest {
  memberId: number;
}
<<<<<<< feat/issue-30

export const responseFromReviews = (reviews: any[]) => {
  const lastReview = reviews[reviews.length - 1];
  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};
=======
>>>>>>> develop
