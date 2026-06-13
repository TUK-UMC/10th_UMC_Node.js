export class AppError extends Error {
  public readonly errorCode: string;
  public readonly statusCode: number;
  public readonly data: unknown | null;

  constructor(params: {
    errorCode: string;
    message: string;
    statusCode: number;
    data?: unknown;
  }) {
    super(params.message);
    this.errorCode = params.errorCode;
    this.statusCode = params.statusCode;
    this.data = params.data ?? null;
  }
}
