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
    updateUser
} from "./user.repository.js";
import { DuplicateUserEmailError, MissionAlreadyOngoingError } from "../../common/errors/error.js";
import { prisma } from "../../db.config.js";

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
        throw new DuplicateUserEmailError(data.email);
    }

    await setPreference(joinUserId, data.preferences);

    const user = await getUser(joinUserId);
    if (!user) {
        throw new Error("USER_NOT_EXIST");
    }

    const preferences = (await getUserPreferencesByUserId(joinUserId))
        .map((obj) => obj.category.name)
        .filter((name): name is string => name !== null);

    return {
        userId: user.id,
        preferences,
        name: user.name ?? "",
        email: user.email ?? "",
        gender: user.gender ?? "NONE",
        birth: user.birth ?? new Date(),
        address: user.address ?? undefined,
        phone: user.phone ?? "",
    };
};

export const userInfoUpdate = async (userId: number, data: UserSignUpRequest): Promise<UserSignUpResponse> => {
    const updatedUserId = await updateUser(userId, {
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: new Date(data.birth),
        address: data.address,
        phone: data.phone,
    });

    // 기존 선호도 삭제
    await prisma.userPreference.deleteMany({
        where: { userId }
    });

    // 새 선호도 저장
    if (data.preferences.length > 0) {
        await setPreference(userId, data.preferences);
    }

    const preferences = (await getUserPreferencesByUserId(updatedUserId))
        .map((obj) => obj.category.name)
        .filter((name): name is string => name !== null);

    const user = await getUser(updatedUserId);
    if (!user) {
        throw new Error("USER_NOT_EXIST");
    }

    return {
        userId: user.id,
        preferences,
        name: user.name ?? "",
        email: user.email ?? "",
        gender: user.gender ?? "NONE",
        birth: user.birth ?? new Date(),
        address: user.address ?? undefined,
        phone: user.phone ?? "",
    };
};

export const challengeMissionService = async (
    userId: number,
    data: ChallengeMissionRequest
): Promise<ChallengeMissionResponse> => {
    const { missionId } = data;

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
        throw new MissionAlreadyOngoingError(data);
    }

    await insertChallenge(userId, missionId, mission.restaurantId);

    return {
        missionId,
        status: "ONGOING",
    };
};

export const listUserReviewsService = async (
    userId: number,
    cursor: number
): Promise<UserReviewListResponse> => {
    const reviews = await getAllUserReviews(userId, cursor);

    return {
        data: reviews.map((review) => ({
            id: review.id,
            userId: review.userId,
            restaurantId: review.restaurantId,
            content: review.content,
            star: review.star?.toString() || null,
        })),
        pagination: {
            cursor: reviews.length === 5 ? cursor + 1 : null,
        },
    };
};

export const listUserMissionsService = async (
    userId: number,
    cursor: number
): Promise<UserMissionListResponse> => {
    const missions = await getAllUserMissions(userId, cursor);

    return {
        data: missions.map((mission) => ({
            id: mission.id,
            restaurantId: mission.restaurantId,
            price: mission.price,
            point: mission.point,
        })),
        pagination: {
            cursor: missions.length === 5 ? cursor + 1 : null,
        },
    };
};
