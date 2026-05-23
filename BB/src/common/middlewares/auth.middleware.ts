import { Request, Response, NextFunction } from "express";
export function authorizeUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
        // cookie-parser가 만들어준 req.cookies 객체에서 username을 확인
        const { username } = req.cookies;
        if (username) {
            next();
        } else {
            res
                .status(401)
                .send(
                    '<script>alert("로그인이 필요합니다!");location.href="/api/v1/users/login";</script>',
                );
        }
    };
}
