import { Controller, Middlewares, Path, Post, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest } from "express";
import { type ChallengeMissionResponse } from "../dtos/mission.dto";
import { startMissionChallenge } from "../services/mission.service";
import { type ApiResponse, success } from "../../../common/responses/response";
import { requireJwt } from "../../../common/middlewares/jwt.middleware";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  @Post("{missionId}/challenge")
  @Middlewares(requireJwt)
  public async handleChallengeMission(
    @Path() missionId: number,
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<ChallengeMissionResponse>> {
    const memberId = Number((req.user as any).memberId);
    return success(await startMissionChallenge(missionId, memberId));
  }
}
