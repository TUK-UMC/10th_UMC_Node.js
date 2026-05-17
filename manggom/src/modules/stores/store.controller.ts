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
  Path,
  Response
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


//Storecontroller 
@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {

  // 가게 추가 
  @Post()
  @Response<ApiResponse<any>>(201, "가게 추가 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleAddStore(
    @Body() body: StoreAddRequest
  ) :Promise<ApiResponse<any>> {
    const store = await storeAdd(body);
    this.setStatus(201);
    return success(store);
  }

// 가게 리뷰 추가 
  @Post("{storeId}/reviews")
  @Response<ApiResponse<any>>(201, "리뷰 추가 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  @Response<ApiResponse<null>>(409, "리뷰 추가 실패") // 리뷰 추가할 예정 
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: ReviewAddRequest
  ) :Promise<ApiResponse<any>> {
    const review = await reviewAdd(storeId, body);
    this.setStatus(201);
    return success(review);
  }

  // 가게 리뷰 조회 
  @Get("{storeId}/reviews")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  @Response<ApiResponse<null>>(409, "리뷰 조회 실패")
  public async handleListStoreReviews(
    @Path() storeId: number
  ) :Promise<ApiResponse<any>> {
    const reviews = await listStoreReviews(storeId);
    return success(reviews);
  }

  //가게에 미션 추가
  @Post("{storeId}/missions")
  @Response<ApiResponse<any>>(201, "미션 추가 성공")
  @Response<ApiResponse<null>>(404, "미션 추가 실패")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleAddMission(
    @Path() storeId: number,
    @Body() body: MissionAddRequest
  ) :Promise<ApiResponse<any>> {
    const mission = await missionAdd(storeId, body);
    this.setStatus(201);
    return success(mission);
  }

  // 유저가 미션 도전
  @Post("{storeId}/missions/{missionId}/users/{userId}")
  public async handleAddUserMission(
    @Path() userId: number,
    @Path() missionId: number
  ) :Promise<ApiResponse<any>> {
    const userMission = await userMissionAdd(userId, missionId);
    this.setStatus(201);
    return success(userMission);
  }

  // 가게 미션 목록 조회 관련 
  @Get("{storeId}/missions")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  @Response<ApiResponse<null>>(409, "미션 조회 실패")
  public async handleListStoreMissions(
    @Path() storeId: number
  ) :Promise<ApiResponse<any>> {
    const missions = await storeMissionList(storeId);
    return success(missions);
  }
}

//UserStorecontroller 
  @Route("users")
  @Tags("Users")
  export class UserStoreController extends Controller {

    //유저가 작성한 리뷰 조회 
  @Get("{userId}/reviews")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  @Response<ApiResponse<null>>(409, "리뷰 조회 실패")
  public async handleListUserReviews(
    @Path() userId: number
  ): Promise<ApiResponse<any>> {
    const reviews = await userReviewList(userId) as ReviewItem[];
    return success({
      data: reviews,
      pagination: { cursor: reviews.length > 0 ? reviews[reviews.length - 1]?.id ?? null : null }
    });
  }

  //유저가 진행하는 미션 조회
  @Get("{userId}/missions")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  @Response<ApiResponse<null>>(409, "미션 조회 실패")
  //진행하는 미션인데 진행이 안된 상태로 뜨거나 진행완료로 되는 경우도 추가 
  @Response<ApiResponse<null>>(409, "진행중인 미션이 아닙니다.")
  public async handleListUserMissions(
    @Path() userId: number
  ): Promise<ApiResponse<any>> {
    const missions = await userMissionList(userId);
    return success(missions);
  }

  // 유저 미션 완료로 변경 
  @Post("{userId}/missions/{missionId}/complete")
  @Response<ApiResponse<null>>(409, "진행중인 미션이 아닙니다.")
  @Response<ApiResponse<null>>(409, "상태변경에 실패했습니다.")
  public async handleCompleteUserMission(
    @Path() userId: number,
    @Path() missionId: number
  ): Promise<ApiResponse<any>> {
    const result = await completeUserMission(userId, missionId);
    return success(result);
  }

  }


