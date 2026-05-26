import { Controller, Middlewares, Patch, Path, Route, Tags } from "tsoa";
import { type CompleteMissionResponse } from "../dtos/member-mission.dto";
import { finishMission } from "../services/member-mission.service";
import { type ApiResponse, success } from "../../../common/responses/response";
import { requireJwt } from "../../../common/middlewares/jwt.middleware";

@Route("member-missions")
@Tags("MemberMissions")
export class MemberMissionController extends Controller {
  @Patch("{memberMissionId}/complete")
  @Middlewares(requireJwt)
  public async handleCompleteMission(
    @Path() memberMissionId: number,
  ): Promise<ApiResponse<CompleteMissionResponse>> {
    return success(await finishMission(memberMissionId));
  }
}
