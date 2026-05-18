import { UserSignUpRequest, responseFromUser, responseFromReviews, responseFromMissions, MissionListResponse, ReviewListResponse } from "./user.dto.js"; //인터페이스 가져오기 
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

export const userSignUp = async (data: UserSignUpRequest) => {
    const joinUserId = await addUser({
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
        address: data.address,
        phone: data.phone,
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, BigInt(preference));
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser({ user, preferences });
};

export const challengeMissionService = async (
    userId: bigint,
    missionId: bigint
) => {
    // 1. 유저 확인
    const user = await getUser(userId);
    if (!user) throw new Error("USER_NOT_EXIST");

    // 2. 미션 확인
    const mission = await findMission(missionId);
    if (!mission) throw new Error("MISSION_NOT_EXIST");
    if (!mission.restaurantId) throw new Error("MISSION_RESTAURANT_NOT_EXIST");

    // 3. 중복 체크
    const exist = await findOngoingMission(userId, missionId);
    if (exist) throw new Error("MISSION_ALREADY_ONGOING");

    // 4. insert
    await insertChallenge(
        userId,
        missionId,
        mission.restaurantId
    );

    return {
        missionId,
        status: "ONGOING"
    };
};

export const listUserReviewsService = async (
    userId: bigint,
    cursor: number
): Promise<ReviewListResponse> => {
    const reviews = await getAllUserReviews(userId, cursor);
    return responseFromReviews(reviews, cursor);
};

export const listUserMissionsService = async (
    userId: bigint,
    cursor: number
): Promise<MissionListResponse> => {
    const missions = await getAllUserMissions(userId, cursor);
    return responseFromMissions(missions, cursor);
};