import { Body, Controller, Get, Middlewares, Path, Post, Query, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest } from "express";
import {
  type AddStoreRequest, type AddStoreResponse,
  type AddReviewRequest, type AddReviewResponse,
  type ReviewsResponse,
} from "../dtos/store.dto";
import { type AddMissionRequest, type AddMissionResponse, type MissionItem } from "../../missions/dtos/mission.dto";
import { createStore, createReview, listStoreReviews } from "../services/store.service";
import { createMission, getStoreMissions } from "../../missions/services/mission.service";
import { type ApiResponse, success } from "../../../common/responses/response";
import { requireJwt } from "../../../common/middlewares/jwt.middleware";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  @Post("")
  @Middlewares(requireJwt)
  public async handleAddStore(
    @Body() body: AddStoreRequest,
  ): Promise<ApiResponse<AddStoreResponse>> {
    return success(await createStore(body));
  }

  @Post("{storeId}/reviews")
  @Middlewares(requireJwt)
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: AddReviewRequest,
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<AddReviewResponse>> {
    const memberId = Number((req.user as any).memberId);
    return success(await createReview(storeId, memberId, body));
  }

  @Post("{storeId}/missions")
  @Middlewares(requireJwt)
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
