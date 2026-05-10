import { UserSignUpRequest, userSignUpResponse } from "./user.dto.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "./user.repository.js";
import { AppError } from "../../common/error/app.error.js";
import { DuplicateUserEmailError } from "../../common/error/error.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<userSignUpResponse> => {
    try {
        const joinUserId = await addUser({
            email: data.email,
            name: data.name,
            gender: data.gender,
            birth: new Date(data.birth),
            address: data.address,
            phoneNumber: data.phoneNumber,
            password: data.password,
        });

        if (joinUserId == null) {
            throw new DuplicateUserEmailError("이미 존재하는 유저입니다", data);
        }

        for (const pre of data.preferences) {
            await setPreference(joinUserId, pre);
        }

        const user = await getUser(joinUserId);
        const userId = Number(user!.userId);
        const preferences = (await getUserPreferencesByUserId(joinUserId)).map(
            (obj) => obj.foodCategory.categoryName
        );

        return { userId, preferences };
    } catch (err) {
        if (err instanceof AppError) throw err;
        throw new DuplicateUserEmailError("회원가입 중 오류가 발생했습니다");
    }
};
