import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Request,
  Res,
  Route,
  Tags,
  Path
} from "tsoa";

import type {
  StoreAddRequest,
  ReviewAddRequest,
  MissionAddRequest,
  ReviewItem
} from "./store.dto.js";

import {
  storeAdd,
  reviewAdd,
  listStoreReviews,
  missionAdd,
  userMissionAdd,
  userReviewList,
  storeMissionList,
  userMissionList,
  completeUserMission
} from "./store.service.js";

import { ApiResponse, success } from "../../common/responses/response.js";
import { authorizeUser } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";


@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {

  @Post()
  public async handleAddStore(
    @Body() body: StoreAddRequest
  ) :Promise<ApiResponse<any>> {
    const store = await storeAdd(body);
    this.setStatus(201);
    return success(store);
  }

  @Post("{storeId}/reviews")
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: ReviewAddRequest
  ) :Promise<ApiResponse<any>> {
    const review = await reviewAdd(storeId, body);
    this.setStatus(201);
    return success(review);
  }

  @Get("{storeId}/reviews")
  public async handleListStoreReviews(
    @Path() storeId: number
  ) :Promise<ApiResponse<any>> {
    const reviews = await listStoreReviews(storeId);
    return success(reviews);
  }

  @Post("{storeId}/missions")
  public async handleAddMission(
    @Path() storeId: number,
    @Body() body: MissionAddRequest
  ) :Promise<ApiResponse<any>> {
    const mission = await missionAdd(storeId, body);
    this.setStatus(201);
    return success(mission);
  }

  @Post("{storeId}/missions/{missionId}/users/{userId}")
  public async handleAddUserMission(
    @Path() userId: number,
    @Path() missionId: number
  ) :Promise<ApiResponse<any>> {
    const userMission = await userMissionAdd(userId, missionId);
    this.setStatus(201);
    return success(userMission);
  }

  @Get("{storeId}/missions")
  public async handleListStoreMissions(
    @Path() storeId: number
  ) :Promise<ApiResponse<any>> {
    const missions = await storeMissionList(storeId);
    return success(missions);
  }
}

  @Route("users")
  @Tags("Users")
  export class UserStoreController extends Controller {

  @Get("{userId}/reviews")
  public async handleListUserReviews(
    @Path() userId: number
  ): Promise<ApiResponse<any>> {
    const reviews = await userReviewList(userId) as ReviewItem[];
    return success({
      data: reviews,
      pagination: { cursor: reviews.length > 0 ? reviews[reviews.length - 1]?.id ?? null : null }
    });
  }

  @Get("{userId}/missions")
  public async handleListUserMissions(
    @Path() userId: number
  ): Promise<ApiResponse<any>> {
    const missions = await userMissionList(userId);
    return success(missions);
  }

  @Post("{userId}/missions/{missionId}/complete")
  public async handleCompleteUserMission(
    @Path() userId: number,
    @Path() missionId: number
  ): Promise<ApiResponse<any>> {
    const result = await completeUserMission(userId, missionId);
    return success(result);
  }

  }


