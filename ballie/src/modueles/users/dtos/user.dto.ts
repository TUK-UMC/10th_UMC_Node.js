export interface UserSignUpRequest {
    email: string;
    name: string;
    gender: number;
    birth: string;
    address?: string;
    phoneNumber: string;
    password: string;
    preferences: number[];
}

export const responseFromUser = (data: { user: any; preferences: any[] }) => {
    const preference = data.preferences.map((p) => p.foodCategory.categoryName);

    return {
        email: data.user.email,
        name: data.user.name,
        gender: data.user.gender,
        birth: data.user.birth,
        address: data.user.address,
        phoneNumber: data.user.phoneNumber,
        preferences: preference,
    };
};

export const bodyToUser = (body: UserSignUpRequest) => {
    const birth = new Date(body.birth);

    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        phoneNumber: body.phoneNumber,
        password: body.password,
        preferences: body.preferences,
    };
};
