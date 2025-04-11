interface ApiResponseProps {
  message: string;
  data: object;
  success?: boolean;
  options?: ResponseInit;
}

export class ApiResponse extends Response {
  message: string;
  data: object;
  success: boolean;

  constructor({
    message,
    data,
    success = true,
    options = {},
  }: ApiResponseProps) {
    const body = JSON.stringify({ message, data, success });
    // Default options
    const defaultOptions: ResponseInit = {
      status: 200,
      headers: { "Content-Type": "application/json" },
    };
    // Merge headers separately
    const mergedOptions: ResponseInit = {
      ...defaultOptions,
      ...options,
      headers: {
        ...(defaultOptions.headers as object),
        ...((options.headers as object) || {}),
      },
    };
    super(body, mergedOptions);
    this.message = message;
    this.data = data;
    this.success = success;
  }
}
