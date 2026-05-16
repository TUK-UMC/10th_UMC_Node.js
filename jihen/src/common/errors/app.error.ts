export class AppError extends Error {
  public readonly errorCode: string;
  public readonly statusCode: number;
  public readonly data?: unknown;

  constructor(params?: {
    errorCode: string;
    message: string;
    statusCode: number;
    data?: unknown;
  }) {
    super(params?.message);
    this.errorCode = params?.errorCode ?? "UNKNOWN";
    this.statusCode = params?.statusCode ?? 500;
    this.data = params?.data ?? null;
  }
}
