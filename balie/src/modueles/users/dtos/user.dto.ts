// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
    email: string;
    name: string;
    gender: string;
    birth: string;
    address?: string;
    phoneNumber: string;
    password: string;
    preferences: number[];
}

export const responseFromUser = ({ user, preferences }: { user: any; preferences: any[] }) => {
    return {
        email: user.email,
        username: user.user_name,
        gender: user.gender,
        birthday: user.birthday,
        address: user.address,
        phoneNumber: user.phone_number,
        preferences: preferences.map((preference) => preference.food_category_id),
    };
};

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다.
export const bodyToUser = (body: UserSignUpRequest) => {
    const birth = new Date(body.birth);

    return {
        email: body.email,
        username: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        phoneNumber: body.phoneNumber,
        password: body.password,
        preferences: body.preferences,
    };
};