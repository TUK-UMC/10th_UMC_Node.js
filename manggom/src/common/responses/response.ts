export interface ApiResponse<T> {
  resultType: "SUCCESS";
  error: null;
  data: T;
}
export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  error: null,
  data,
});

declare global {
    namespace Express {
        interface Response {
            error: (params: { errorCode?: string | null; message?: string | null; data?: any }) => void;
        }
    }
}