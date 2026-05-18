import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser, UserSignUpRequest } from "./user.dto.js";
import { userSignUp, challengeMissionService, listUserReviewsService, listUserMissionsService } from "./user.service.js";
import { parseBigInt } from "../../utils/parse.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    //서비스 로직 호출 
    // req.body를 UserSignUpRequest 타입으로 '강제' (Type Assertion) 해줍니다. 
    const user = await userSignUp(bodyToUser(req.body as UserSignUpRequest));

    //성공 응답 보내기
    res.status(StatusCodes.OK).json({ result: user });
};

export const challengeMission = async (req: Request, res: Response) => {
    try {
        const userId = parseBigInt(req.params.userId);
        const missionId = BigInt(req.body.missionId);

        const result = await challengeMissionService(userId, missionId);

        return res.json({
            success: true,
            code: "S200",
            message: "미션 도전 요청 성공",
            data: [{
                ...result,
                missionId: result.missionId.toString(),
            }]
        });

    } catch (err: any) {
        if (err.message === "MISSION_ALREADY_ONGOING") {
            return res.status(400).json({
                success: false,
                code: "MISSION_ALREADY_ONGOING",
                message: "이미 미션을 등록했습니다.",
                data: null
            });
        }

        return res.status(500).json({
            success: false,
            code: "E500",
            message: `서버 에러: ${err.message}`,
            data: null
        });
    }
};

export const listUserMissions = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = parseBigInt(req.params.userId);
        const cursor =
            typeof req.query.cursor === "string"
                ? parseInt(req.query.cursor, 10)
                : 0;

        const missions = await listUserMissionsService(userId, cursor);

        res.status(StatusCodes.OK).json(missions);
    } catch (err) {
        next(err);
    }
};

export const listUserReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = parseBigInt(req.params.userId);
        const cursor =
            typeof req.query.cursor === "string"
                ? parseInt(req.query.cursor, 10)
                : 0;

        const reviews = await listUserReviewsService(userId, cursor);

        res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
        next(err);
    }
};