import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../errors/error";

export const authorizeUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  if (req.cookies.username) {
    next();
  } else {
    next(new UnauthorizedException("로그인이 필요합니다."));
  }
};
