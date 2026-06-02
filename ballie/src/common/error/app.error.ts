export class AppError extends Error {
    public readonly errorCode: string
    public readonly statusCode: number

    constructor(params: {
        errorCode: string
        message: string
        statusCode: number
    }) {
        super(params.message);
        this.errorCode = params.errorCode;
        this.statusCode = params.statusCode;
    }
}
