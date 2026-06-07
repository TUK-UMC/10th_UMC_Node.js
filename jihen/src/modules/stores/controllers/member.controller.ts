import { Controller, Get, Path, Response as TsoaResponse, Route, Tags } from "tsoa";
import { type OngoingMissionItem } from "../dtos/store.dto";
import { getMyOngoingMissions } from "../services/store.service";
import { type ApiResponse, success } from "../../../common/responses/response";

@Route("members")
@Tags("Members")
export class MemberController extends Controller {
  /**
   * @summary 진행 중인 미션 목록 조회 API
   */
  @Get("{memberId}/missions")
  @TsoaResponse<ApiResponse<OngoingMissionItem[]>>(200, "진행 중인 미션 목록 조회 성공")
  public async handleGetMyMissions(
    @Path() memberId: number,
  ): Promise<ApiResponse<OngoingMissionItem[]>> {
    return success(await getMyOngoingMissions(memberId));
  }
}
