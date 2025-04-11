export class ApiError extends Error {
  data: object;
  constructor({ message, data }: { message: string; data: object }) {
    super(message);
    this.data = data;
  }
}
