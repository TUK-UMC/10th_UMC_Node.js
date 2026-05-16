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
} from "tsoa";
import type { UserSignUpRequest, UserSignUpResponse } from "./user.dto.js";
import { userSignUp } from "./user.service.js";
import { authorizeUser } from "../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../common/responses/response.js";


@Route("users")
@Tags("Users")
export class UserController extends Controller {

  @Post("signup")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body);
    return success(user);
  }

}

