import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
import {
  type AddStoreRequest, type AddStoreResponse,
  type AddReviewRequest, type AddReviewResponse,
  type AddMissionRequest, type AddMissionResponse,
  type MissionItem, type ReviewsResponse,
} from "../dtos/store.dto";
import {
  createStore, createReview, createMission,
  getStoreMissions, listStoreReviews,
} from "../services/store.service";
import { type ApiResponse, success } from "../../../common/responses/response";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  @Post("")
  public async handleAddStore(
    @Body() body: AddStoreRequest,
  ): Promise<ApiResponse<AddStoreResponse>> {
    return success(await createStore(body));
  }

  @Post("{storeId}/reviews")
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: AddReviewRequest,
  ): Promise<ApiResponse<AddReviewResponse>> {
    return success(await createReview(storeId, body));
  }

  @Post("{storeId}/missions")
  public async handleAddMission(
    @Path() storeId: number,
    @Body() body: AddMissionRequest,
  ): Promise<ApiResponse<AddMissionResponse>> {
    return success(await createMission(storeId, body));
  }

  @Get("{storeId}/reviews")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<ReviewsResponse>> {
    return success(await listStoreReviews(storeId, cursor ?? 0));
  }

  @Get("{storeId}/missions")
  public async handleGetStoreMissions(
    @Path() storeId: number,
  ): Promise<ApiResponse<MissionItem[]>> {
    return success(await getStoreMissions(storeId));
  }
}
