export interface ApiResponse<T> {
  resultType: "SUCCESS";
  data: T;
}

export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  data,
});
