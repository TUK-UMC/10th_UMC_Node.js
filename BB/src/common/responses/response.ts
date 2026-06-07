export interface ApiResponse<T> {
    resultType: "SUCCESS";
    success: T;
}
export const success = <T>(data: T): ApiResponse<T> => ({
    resultType: "SUCCESS",
    success: data,
});

declare global {
    namespace Express {
        interface Response {
            error: (params: { errorCode?: string | null; message?: string | null; data?: any }) => void;
        }
    }
}