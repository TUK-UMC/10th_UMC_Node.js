export interface ApiResponse<T> {
    resultType: "SUCCESS"
    data: T
}

export const success = <T>(data: T): ApiResponse<T> => ({
    resultType: "SUCCESS",
    data,
})

declare global {
    namespace Express {
        interface User {
            userId?: bigint;
            name?: string;
            email?: string | null;
            accessToken?: string;
            refreshToken?: string;
        }
        interface Response {
            success: <T>(data: T) => void;
            error: (params: { errorCode?: string | null; message?: string | null }) => void;
        }
    }
}

