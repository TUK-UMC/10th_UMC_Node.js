import "reflect-metadata";
import dotenv from "dotenv";
import express, { type Express, type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUiExpress from "swagger-ui-express";
import { RegisterRoutes } from "./generated/routes";
import { AppError } from "./common/errors/app.error";

dotenv.config();

const port = process.env.PORT;
if (!port) throw new Error("PORT 환경변수가 설정되지 않았습니다.");

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, { swaggerOptions: { url: "/openapi.json" } })
);
app.get("/openapi.json", (_req, res) => {
  res.sendFile("swagger.json", { root: "./dist" });
});

const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

app.use((err: AppError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error("[ERROR]", err);
  const statusCode = err.statusCode ?? (err as any).status ?? 500;
  res.status(statusCode).json({
    resultType: "FAILED",
    error: {
      errorCode: err.errorCode || "unknown",
      message: err.message || null,
      data: err.data || null,
    },
    data: null,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
