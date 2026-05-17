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
  Response
} from "tsoa";
import type { UserSignUpRequest, UserSignUpResponse } from "./user.dto.js";
import { userSignUp } from "./user.service.js";
import { authorizeUser } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../common/responses/response.js";
import { Response as ExpressResponse} from "express";


@Route("users")
@Tags("Users")
export class UserController extends Controller {

  @Post("signup")
  @Response<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
  @Response<ApiResponse<null>>(409, "중복된 이메일 에러") //
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest
  ): Promise<ApiResponse<UserSignUpResponse>> {
    const user = await userSignUp(body);
    return success(user);
  }

}

