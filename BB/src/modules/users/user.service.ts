import { ChallengeMissionResponse, UserSignUpRequest, UserSignUpResponse, ReviewListResponse, MissionListResponse, ChallengeMissionRequest } from "./user.dto.js"; //인터페이스 가져오기 
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
    findMission,
    findOngoingMission,
    insertChallenge,
    getAllUserReviews,
    getAllUserMissions
} from "./user.repository.js";
import { Decimal } from "@prisma/client/runtime/client";
import { DuplicateUserEmailError, MissionAlreadyOngoingError } from "../../common/errors/error.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
    const joinUserId = await addUser({
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
        address: data.address,
        phone: data.phone,
    });

    if (joinUserId === null) {
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, BigInt(preference));
    }

    const user = await getUser(joinUserId);
    const userId = user!.id;
    const preferences = (await getUserPreferencesByUserId(joinUserId)).map(
        (obj) => obj.category.name,
    );

    return <UserSignUpResponse>{
        userId,
        preferences,
        name: user!.name,
        email: user!.email,
        gender: user!.gender,
        birth: user!.birth,
        address: user!.address,
        phone: user!.phone,
    };
};

export const challengeMissionService = async (
    data: ChallengeMissionRequest
): Promise<ChallengeMissionResponse> => {
    // 1. 유저 확인
    const user = await getUser(data.userId);
    if (!user) throw new Error("USER_NOT_EXIST");

    // 2. 미션 확인
    const mission = await findMission(data.missionId);
    if (!mission) throw new Error("MISSION_NOT_EXIST");
    if (!mission.restaurantId) throw new Error("MISSION_RESTAURANT_NOT_EXIST");

    // 3. 중복 체크
    const exist = await findOngoingMission(data.userId, data.missionId);
    if (exist) throw new MissionAlreadyOngoingError("이미 진행 중인 미션입니다.", data);

    // 4. insert
    await insertChallenge(
        data.userId,
        data.missionId,
        mission.restaurantId
    );

    return {
        missionId: data.missionId.toString(),
        status: "ONGOING"
    };
};

export const listUserReviewsService = async (
    userId: bigint,
    cursor: number
): Promise<ReviewListResponse> => {
    const reviews = await getAllUserReviews(userId, cursor);
    return <ReviewListResponse>{
        data: reviews.map((review) => ({
            ...review,
            id: review.id.toString(),
            userId: review.userId.toString(),
            restaurantId: review.restaurantId?.toString() || null,
            content: review.content,
            star: review.star === null ? null : Decimal(review.star),
        })),
        pagination: {
            cursor: reviews.length === 5 ? cursor + 1 : null,
        },
    };
};

export const listUserMissionsService = async (
    userId: bigint,
    cursor: number
): Promise<MissionListResponse> => {
    const missions = await getAllUserMissions(userId, cursor);
    return <MissionListResponse>{
        data: missions.map((complete) => ({
            ...complete,
            id: complete.id.toString(),
            restaurantId: complete.restaurantId?.toString() || null,
            price: complete.price,
            point: complete.point,
        })),
        pagination: {
            cursor: missions.length === 5 ? cursor + 1 : null,
        },
    };
};