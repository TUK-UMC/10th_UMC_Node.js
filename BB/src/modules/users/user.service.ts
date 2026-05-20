import {
    ChallengeMissionRequest,
    ChallengeMissionResponse,
    UserMissionListResponse,
    UserReviewListResponse,
    UserSignUpRequest,
    UserSignUpResponse,
} from "./user.dto.js";
import {
    addUser,
    findMission,
    findOngoingMission,
    getAllUserMissions,
    getAllUserReviews,
    getUser,
    getUserPreferencesByUserId,
    insertChallenge,
    setPreference,
} from "./user.repository.js";
import { DuplicateUserEmailError, MissionAlreadyOngoingError } from "../../common/errors/error.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
    const joinUserId = await addUser({
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: new Date(data.birth),
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
    if (!user) {
        throw new Error("USER_NOT_EXIST");
    }

    const preferences = (await getUserPreferencesByUserId(joinUserId))
        .map((obj) => obj.category.name)
        .filter((name): name is string => name !== null);

    return {
        userId: user.id.toString(),
        preferences,
        name: user.name ?? "",
        email: user.email ?? "",
        gender: user.gender ?? "",
        birth: user.birth ?? new Date(),
        address: user.address ?? undefined,
        phone: user.phone ?? "",
    };
};

export const challengeMissionService = async (
    data: ChallengeMissionRequest
): Promise<ChallengeMissionResponse> => {
    const userId = BigInt(data.userId);
    const missionId = BigInt(data.missionId);

    const user = await getUser(userId);
    if (!user) {
        throw new Error("USER_NOT_EXIST");
    }

    const mission = await findMission(missionId);
    if (!mission) {
        throw new Error("MISSION_NOT_EXIST");
    }
    if (!mission.restaurantId) {
        throw new Error("MISSION_RESTAURANT_NOT_EXIST");
    }

    const exist = await findOngoingMission(userId, missionId);
    if (exist) {
        throw new MissionAlreadyOngoingError("이미 진행 중인 미션입니다.", data);
    }

    await insertChallenge(userId, missionId, mission.restaurantId);

    return {
        missionId: missionId.toString(),
        status: "ONGOING",
    };
};

export const listUserReviewsService = async (
    userId: bigint,
    cursor: number
): Promise<UserReviewListResponse> => {
    const reviews = await getAllUserReviews(userId, cursor);

    return {
        data: reviews.map((review) => ({
            id: review.id.toString(),
            userId: review.userId.toString(),
            restaurantId: review.restaurantId?.toString() || null,
            content: review.content,
            star: review.star?.toString() || null,
        })),
        pagination: {
            cursor: reviews.length === 5 ? cursor + 1 : null,
        },
    };
};

export const listUserMissionsService = async (
    userId: bigint,
    cursor: number
): Promise<UserMissionListResponse> => {
    const missions = await getAllUserMissions(userId, cursor);

    return {
        data: missions.map((mission) => ({
            id: mission.id.toString(),
            restaurantId: mission.restaurantId?.toString() || null,
            price: mission.price,
            point: mission.point,
        })),
        pagination: {
            cursor: missions.length === 5 ? cursor + 1 : null,
        },
    };
};
