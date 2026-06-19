import { Controller, Get, Middlewares, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest } from "express";
import { type OngoingMissionItem } from "../dtos/member.dto";
import { getMyOngoingMissions } from "../services/member.service";
import { type ApiResponse, success } from "../../../common/responses/response";
import { requireJwt } from "../../../common/middlewares/jwt.middleware";

@Route("members")
@Tags("Members")
export class MemberController extends Controller {
  @Get("me/missions")
  @Middlewares(requireJwt)
  public async handleGetMyMissions(
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<OngoingMissionItem[]>> {
    const memberId = Number((req.user as any).memberId);
    return success(await getMyOngoingMissions(memberId));
  }
}
