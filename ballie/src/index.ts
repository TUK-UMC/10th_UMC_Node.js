import dotenv from "dotenv";
(BigInt.prototype as any).toJSON = function () { return this.toString(); };
import express, {Express, NextFunction, Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "./generated/routes.js";
import morgan from "morgan";
import {AppError} from "./common/error/app.error";
import { jwtAuth } from "./common/middlewares/auth.middleware.js";
import { googleStrategy , jwtStrategy } from "./auth.config.js";
import swaggerUi from "swagger-ui-express"
import path from "path";
import fs from "fs"
import passport from "passport";


// 1. 환경 변수 설정
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use((req: Request, res: Response, next: NextFunction) => {
    res.success = function (data) {
        return this.json({
            resultType: "SUCCESS",
            data,
        });
    };
    res.error = function ({ errorCode = null, message = null }) {
        return this.json({
            resultType: "FAILED",
            error: { errorCode, message },
        });
    };
    next();
});

app.use(morgan("dev"));
app.use(cookieParser());


// 2. 미들웨어 설정
app.use(cors(
    {origin:['http://127.0.0.1:5500']}
));            // cors 방식 허용
app.use(express.static('public'));    // 정적 파일 접근
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(passport.initialize());
passport.use(googleStrategy);
passport.use(jwtStrategy);

const swaggerFile = JSON.parse(
    fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get("/oauth2/callback/google", 
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req, res) => {
    res.status(200).json({ success: true, tokens: req.user });
  }
);
// 2. Swagger UI 연결
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World! This is TypeScript Server!");
});


const isLogin = jwtAuth();

const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);


app.get('/mypage', isLogin , (req, res) => {
  res.status(200).success({
    message: `인증 성공! ${req.user!.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});


app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "INTERNAL_SERVER_ERROR",
        message: err.message || null,
    });
});


// 4. 서버 시작
app.listen(port, () => {
    console.log(`[server]: Server is running at <http://localhost>:${port}`);
});