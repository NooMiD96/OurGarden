export interface IResponse<T> {
    data: T;
    error: string;
}

export interface IJsonValidationError {
    status: number;
    title: string;
    traceId: string;
}
