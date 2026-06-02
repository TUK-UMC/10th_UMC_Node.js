import { Request, Response, NextFunction, RequestHandler } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { UnauthorizedError, InvalidTokenError, ExpiredTokenError } from "../error/error.js";

export function authorizeUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.cookies;
        if (username) {
            console.log(`[인증 성공] ${username}님, 환영합니다.`);
            next();
        } else {
            console.log("[인증 실패] 로그인이 필요합니다.");
            res
                .status(401)
                .send(
                    '<script>alert("로그인이 필요합니다!");location.href="/api/v1/users/login";</script>',
                );
        }
    };
}

export const jwtAuth = (): RequestHandler => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return next(new UnauthorizedError());
    }

    const token = authHeader.slice(7);
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) return next(new ExpiredTokenError());
        return next(new InvalidTokenError());
    }

    passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
        if (err) return next(err);
        if (!user) return next(new UnauthorizedError());
        req.user = user;
        next();
    })(req, res, next);
};
