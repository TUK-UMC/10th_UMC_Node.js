import { prisma } from "../../db.config.js";

export const addReview = async (data: {
  userId: number;
  restaurantId: number;
  reviewTitle: string;
  reviewContent: string;
  score: number;
}): Promise<number> => {
  const result = await prisma.review.create({
    data: {
      userId: BigInt(data.userId),
      restaurantId: BigInt(data.restaurantId),
      reviewTitle: data.reviewTitle,
      reviewContent: data.reviewContent,
      score: data.score,
    },
  });
  return Number(result.reviewId);
};

export const getReview = async (reviewId: number) => {
  return await prisma.review.findUnique({ where: { reviewId: BigInt(reviewId) } });
};

export const getUserById = async (userId: number) => {
  return await prisma.user.findUnique({ where: { userId: BigInt(userId) } });
};

export const getRestaurantById = async (restaurantId: number) => {
  return await prisma.restaurant.findUnique({ where: { restaurantId: BigInt(restaurantId) } });
};

export const getReviewsByUserId = async (userId: number) => {
  return await prisma.review.findMany({
    where: { userId: BigInt(userId) },
    include: {
      user: true,
      restaurant: true,
    },
  });
};
