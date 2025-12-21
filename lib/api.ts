export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
  timestamp: string;
  requestId: string;
}

export interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: any;
  baseURL?: string;
}

export class ApiError extends Error {
  public status: number;
  public code?: string;
  public requestId?: string;

  constructor(
    message: string,
    status: number,
    code?: string,
    requestId?: string
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}
export async function makeRequest<T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    headers = {},
    body,
    baseURL = process.env.API_URL || "http://localhost:3001",
  } = config;

  const url = `${baseURL}/api${endpoint}`;

  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  const requestConfig: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body && method !== "GET") {
    requestConfig.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestConfig);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || "Request failed",
        response.status,
        data.code,
        data.requestId
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0
    );
  }
}
