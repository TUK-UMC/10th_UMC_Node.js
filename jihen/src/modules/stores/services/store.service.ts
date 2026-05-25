import {
  type AddStoreRequest, type AddStoreResponse,
  type AddReviewRequest, type AddReviewResponse,
  type ReviewsResponse,
} from "../dtos/store.dto";
import {
  addStore,
  getStoreById,
  getStoreByNameAndAddress,
  addReview,
  getAllStoreReviews,
} from "../repositories/store.repository";
import { DuplicateStoreError, StoreNotFoundError } from "../../../common/errors/error";

export const createStore = async (data: AddStoreRequest): Promise<AddStoreResponse> => {
  const existing = await getStoreByNameAndAddress(data.name, data.address);
  if (existing) throw new DuplicateStoreError("이미 동일한 이름과 주소의 가게가 존재합니다.", data);
  const storeId = await addStore(data);
  return { storeId };
};

export const createReview = async (storeId: number, data: AddReviewRequest): Promise<AddReviewResponse> => {
  const store = await getStoreById(storeId);
  if (!store) throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId });
  const reviewId = await addReview(storeId, data);
  return { reviewId };
};

export const listStoreReviews = async (storeId: number, cursor: number): Promise<ReviewsResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  const lastReview = reviews[reviews.length - 1];
  return {
    data: reviews,
    pagination: { cursor: lastReview ? lastReview.id : null },
  };
};