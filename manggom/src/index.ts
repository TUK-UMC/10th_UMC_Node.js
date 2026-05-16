import "dotenv/config";
import express, { Express, Request, Response,NextFunction } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { AppError } from "./common/errors/app.error.js";
import { AnyCnameRecord } from "node:dns";

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

// 미들웨어 설정
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));  // morgan 추가 
app.use(cookieParser()); // cookie-parser 추가
 
// tsoa 라우트 등록
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

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


// 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === "ValidateError") {
    res.status(400).json({
      message: "Validation failed",
      details: err.fields,
    });
  } else {
    next(err);
  }
});