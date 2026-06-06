import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { AppError } from "./common/errors/app.error.js";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

// 1. 환경 변수 설정
dotenv.config();

passport.use(jwtStrategy);
passport.use(googleStrategy);

const app: Express = express();
app.use(morgan('dev'));
app.use(cookieParser());
const port = process.env.PORT;

app.use((req: Request, res: Response, next: NextFunction) => {
    res.error = function ({ errorCode = null, message = null, data = null }) {
        return this.json({
            resultType: "FAILED",
            error: { errorCode, message, data },
            data: null,
        });
    };
    next();
});

// 2. 미들웨어 설정
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(passport.initialize());

// Express.js에 생성한 엔드 포인트들을 register
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

// 1. TSOA가 생성한 swagger.json 읽어오기
const swaggerFile = JSON.parse(
    fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

// 2. Swagger UI 연결
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


// 3. 서버 시작
app.listen(port, () => {
    console.log(`[server]: Server is running at <http://localhost>:${port}`);
});

// 전역 오류 처리 미들웨어
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "unknown",
        message: err.message || null,
        data: err.data || null,
    });
});



// 쿠키 만드는 라우터 
app.get('/setcookie', (req, res) => {
    // 'myCookie'라는 이름으로 'hello' 값을 가진 쿠키를 생성
    res.cookie('myCookie', 'hello', { maxAge: 60000 }); // 60초간 유효
    res.send('쿠키가 생성되었습니다!');
});

// 쿠키 읽는 라우터 
app.get('/getcookie', (req, res) => {
    // cookie-parser 덕분에 req.cookies 객체에서 바로 꺼내 쓸 수 있음
    const myCookie = req.cookies.myCookie;

    if (myCookie) {
        console.log(req.cookies); // { myCookie: 'hello' }
        res.send(`당신의 쿠키: ${myCookie}`);
    } else {
        res.send('쿠키가 없습니다.');
    }
});

app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get("/oauth2/callback/google",
    passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
    (req, res) => {
        res.status(200).json({ success: true, tokens: req.user });
    }
);

const isLogin = passport.authenticate('jwt', { session: false });

app.get('/mypage', isLogin, (req, res) => {
    res.status(200).json({
        message: `인증 성공! ${req.user}님의 마이페이지입니다.`,
        user: req.user,
    });
});