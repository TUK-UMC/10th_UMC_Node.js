import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
import { type ChallengeMissionRequest, type ChallengeMissionResponse } from "../dtos/mission.dto";
import { startMissionChallenge } from "../services/mission.service";
import { type ApiResponse, success } from "../../../common/responses/response";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  @Post("{missionId}/challenge")
  public async handleChallengeMission(
    @Path() missionId: number,
    @Body() body: ChallengeMissionRequest,
  ): Promise<ApiResponse<ChallengeMissionResponse>> {
    return success(await startMissionChallenge(missionId, body));
  }
}