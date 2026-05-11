import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
<<<<<<< feat/issue-30
import {
  handleAddStore,
  handleAddReview,
  handleAddMission,
  handleChallengeMission,
  handleGetStoreMissions,
  handleGetMyMissions,
  handleCompleteMission,
  handleListStoreReviews,
} from "./modules/stores/controllers/store.controller.js";
=======
import { handleAddStore, handleAddReview, handleAddMission, handleChallengeMission } from "./modules/stores/controllers/store.controller.js";
>>>>>>> develop

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

<<<<<<< feat/issue-30
// 기존 API
app.post("/api/v1/users/signup", handleUserSignUp);
=======
app.post("/api/v1/users/signup", handleUserSignUp);

>>>>>>> develop
app.post("/api/v1/stores", handleAddStore);
app.post("/api/v1/stores/:storeId/reviews", handleAddReview);
app.post("/api/v1/stores/:storeId/missions", handleAddMission);
app.post("/api/v1/missions/:missionId/challenge", handleChallengeMission);

<<<<<<< feat/issue-30
// 가게 리뷰 목록 (커서 페이지네이션)
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// ③ 특정 가게의 미션 목록
app.get("/api/v1/stores/:storeId/missions", handleGetStoreMissions);

// ④ 내가 진행 중인 미션 목록
app.get("/api/v1/members/:memberId/missions", handleGetMyMissions);

// ⑤ 미션 완료 처리
app.patch("/api/v1/member-missions/:memberMissionId/complete", handleCompleteMission);

=======
>>>>>>> develop
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
