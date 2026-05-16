import { Controller, Patch, Path, Response as TsoaResponse, Route, Tags } from "tsoa";
import { type CompleteMissionResponse } from "../dtos/store.dto";
import { finishMission } from "../services/store.service";
import { type ApiResponse, success } from "../../../common/responses/response";

@Route("member-missions")
@Tags("MemberMissions")
export class MemberMissionController extends Controller {
  /**
   * @summary 미션 완료 처리 API
   */
  @Patch("{memberMissionId}/complete")
  @TsoaResponse<ApiResponse<CompleteMissionResponse>>(200, "미션 완료 처리 성공")
  @TsoaResponse<ApiResponse<null>>(404, "존재하지 않는 멤버미션")
  public async handleCompleteMission(
    @Path() memberMissionId: number,
  ): Promise<ApiResponse<CompleteMissionResponse>> {
    return success(await finishMission(memberMissionId));
  }
}
