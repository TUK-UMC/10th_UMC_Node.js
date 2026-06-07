import { Body, Controller, Get, Path, Post, Query, Response as TsoaResponse, Route, Tags } from "tsoa";
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
  /**
   * @summary 가게 등록 API
   */
  @Post("")
  @TsoaResponse<ApiResponse<AddStoreResponse>>(200, "가게 등록 성공")
  @TsoaResponse<ApiResponse<null>>(409, "이미 동일한 이름과 주소의 가게 존재")
  public async handleAddStore(
    @Body() body: AddStoreRequest,
  ): Promise<ApiResponse<AddStoreResponse>> {
    return success(await createStore(body));
  }

  /**
   * @summary 가게 리뷰 등록 API
   */
  @Post("{storeId}/reviews")
  @TsoaResponse<ApiResponse<AddReviewResponse>>(200, "리뷰 등록 성공")
  @TsoaResponse<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: AddReviewRequest,
  ): Promise<ApiResponse<AddReviewResponse>> {
    return success(await createReview(storeId, body));
  }

  /**
   * @summary 가게 미션 등록 API
   */
  @Post("{storeId}/missions")
  @TsoaResponse<ApiResponse<AddMissionResponse>>(200, "미션 등록 성공")
  @TsoaResponse<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleAddMission(
    @Path() storeId: number,
    @Body() body: AddMissionRequest,
  ): Promise<ApiResponse<AddMissionResponse>> {
    return success(await createMission(storeId, body));
  }

  /**
   * @summary 가게 리뷰 목록 조회 API
   */
  @Get("{storeId}/reviews")
  @TsoaResponse<ApiResponse<ReviewsResponse>>(200, "리뷰 목록 조회 성공")
  @TsoaResponse<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<ReviewsResponse>> {
    return success(await listStoreReviews(storeId, cursor ?? 0));
  }

  /**
   * @summary 가게 미션 목록 조회 API
   */
  @Get("{storeId}/missions")
  @TsoaResponse<ApiResponse<MissionItem[]>>(200, "미션 목록 조회 성공")
  @TsoaResponse<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleGetStoreMissions(
    @Path() storeId: number,
  ): Promise<ApiResponse<MissionItem[]>> {
    return success(await getStoreMissions(storeId));
  }
}
