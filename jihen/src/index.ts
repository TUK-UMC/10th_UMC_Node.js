import "reflect-metadata";
import dotenv from "dotenv";
import express, { type Express, type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import { RegisterRoutes } from "./generated/routes";
import { googleStrategy, jwtStrategy } from "./auth.config.js";

dotenv.config();

passport.use(googleStrategy);
passport.use(jwtStrategy);

const port = process.env.PORT;
if (!port) throw new Error("PORT 환경변수가 설정되지 않았습니다.");

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// OAuth 라우트
const isLogin = passport.authenticate("jwt", { session: false });

app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req: Request, res: Response) => {
    res.status(200).json({ success: true, tokens: req.user });
  }
);

app.get("/mypage", isLogin, (req: Request, res: Response) => {
  const member = req.user as any;
  res.status(200).json({
    message: `인증 성공! ${member.name}님의 마이페이지입니다.`,
    user: member,
  });
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  console.error("[에러]", err);
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = err.statusCode ?? err.status ?? 500;
  res.status(statusCode).json({
    resultType: "FAILED",
    error: {
      errorCode: err.errorCode || "unknown",
      message: err.message || null,
      data: err.fields || err.data || null,
    },
    data: null,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
