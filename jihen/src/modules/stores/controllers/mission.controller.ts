import { Body, Controller, Path, Post, Response as TsoaResponse, Route, Tags } from "tsoa";
import { type ChallengeMissionRequest, type ChallengeMissionResponse } from "../dtos/store.dto";
import { startMissionChallenge } from "../services/store.service";
import { type ApiResponse, success } from "../../../common/responses/response";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * @summary 미션 도전 신청 API
   */
  @Post("{missionId}/challenge")
  @TsoaResponse<ApiResponse<ChallengeMissionResponse>>(200, "미션 도전 신청 성공")
  @TsoaResponse<ApiResponse<null>>(404, "존재하지 않는 미션")
  @TsoaResponse<ApiResponse<null>>(409, "이미 도전 중인 미션")
  public async handleChallengeMission(
    @Path() missionId: number,
    @Body() body: ChallengeMissionRequest,
  ): Promise<ApiResponse<ChallengeMissionResponse>> {
    return success(await startMissionChallenge(missionId, body));
  }
}
