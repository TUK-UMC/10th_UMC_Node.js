export interface UserSignUpRequest {
    email: string;
    name: string;
    gender: number;
    birth: string;
    address: string;
    phoneNumber: string;
    password: string;
    preferences: number[];
}

export interface userSignUpResponse{
    userId : number
    preferences : String[]
}
