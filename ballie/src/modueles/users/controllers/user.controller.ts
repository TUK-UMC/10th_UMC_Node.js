import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {bodyToUser, UserSignUpRequest} from "../dtos/user.dto.js";
import { userSignUp } from "../servives/user.service.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction ) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);

    const user = await userSignUp(bodyToUser(req.body as UserSignUpRequest));

    res.status(StatusCodes.OK).json({ result: user });
};