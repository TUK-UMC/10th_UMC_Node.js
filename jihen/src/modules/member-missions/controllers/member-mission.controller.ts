import { Controller, Patch, Path, Route, Tags } from "tsoa";
import { type CompleteMissionResponse } from "../dtos/member-mission.dto";
import { finishMission } from "../services/member-mission.service";
import { type ApiResponse, success } from "../../../common/responses/response";

@Route("member-missions")
@Tags("MemberMissions")
export class MemberMissionController extends Controller {
  @Patch("{memberMissionId}/complete")
  public async handleCompleteMission(
    @Path() memberMissionId: number,
  ): Promise<ApiResponse<CompleteMissionResponse>> {
    return success(await finishMission(memberMissionId));
  }
}