import dotenv from "dotenv";
import express, {Express, NextFunction, Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "./generated/routes.js";
import morgan from "morgan";
import {AppError} from "./common/error/app.error";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
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

app.use(morgan("dev"));
app.use(cookieParser());
app.get("/test",(req,res) => {
    res.send("hello!");
})

app.get('/setcookie',(req,res) => {
    res.cookie('myCookie','hello',{maxAge:6000})
    res.send("ok")
})

app.get('/getcookie', (req,res) => {
    const myCookie = req.cookies.myCookie
    if (myCookie) {
        console.log(req.cookies);
        res.send(`당신의 쿠키 : ${myCookie}`);
    }else {
        res.send("쿠키가 없습니다")
    }
})

// 2. 미들웨어 설정
app.use(cors());            // cors 방식 허용
app.use(express.static('public'));    // 정적 파일 접근
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World! This is TypeScript Server!");
});


const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);


const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const {username} = req.cookies;

    if (username) {
        console.log(`[인증성공] ${username} 님 환영합니다`);
        next()
    }else {
        console.log('[인증실패] 로그인이 필요합니다')
        res.status(401).send('<script>alert("로그인이 필요합니다!");location.href="/login";</script>')
    }
}

app.get('/mypage',isLogin,(req: Request, res: Response) => {
    res.send(`
        <h1>마이페이지</h1>
        <p>환영합니다, ${req.cookies.username}님!</p>
        <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
    `)
})


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


// app.post("/api/v1/missions/restaurant", handleMissionAdd);
// app.get("/api/v1/restaurants/:restaurantId/missions", handleGetRestaurantMissions);
// app.post("/api/v1/reviews", handleReviewAdd);
// app.get("/api/v1/users/:userId/reviews", handleGetUserReviews);
// app.post("/api/v1/user_missions", handleUserMissionAdd);
// app.get("/api/v1/users/:userId/missions/restaurant", handleGetUserRestaurantMission);
// app.get("/api/v1/users/:userId/missions/active", handleGetActiveUserMissions);
// app.patch("/api/v1/user_missions/:userMissionId/complete", handleCompleteUserMission);

// 4. 서버 시작
app.listen(port, () => {
    console.log(`[server]: Server is running at <http://localhost>:${port}`);
});