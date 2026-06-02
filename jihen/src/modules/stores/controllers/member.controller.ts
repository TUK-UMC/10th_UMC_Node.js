import { Controller, Get, Path, Route, Tags } from "tsoa";
import { type OngoingMissionItem } from "../dtos/store.dto";
import { getMyOngoingMissions } from "../services/store.service";
import { type ApiResponse, success } from "../../../common/responses/response";

@Route("members")
@Tags("Members")
export class MemberController extends Controller {
  @Get("{memberId}/missions")
  public async handleGetMyMissions(
    @Path() memberId: number,
  ): Promise<ApiResponse<OngoingMissionItem[]>> {
    return success(await getMyOngoingMissions(memberId));
  }
}
