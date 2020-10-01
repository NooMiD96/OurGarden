export class ResponseError extends Error {
  constructor({ message, data }: { message?: string; data?: any }) {
    super(message);
    this.data = data;
  }

  public data: any;
}
