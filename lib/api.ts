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

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function attemptTokenRefresh(): Promise<boolean> {
  if (isRefreshing) {
    return refreshPromise!;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const { refreshToken } = await import("../actions/auth");
      const response = await refreshToken();
      return response?.success || false;
    } catch {
      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function makeRequest<T = any>(
  endpoint: string,
  config: RequestConfig = {},
  retryCount = 0
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

  // Add auth token from cookies if available (server-side)
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const token = cookieStore.get("auth-token")?.value;

      if (token) {
        (requestHeaders as any).Authorization = `Bearer ${token}`;
      }
    } catch {
      console.log("Error accessing cookies");
      // Ignore cookie access errors
    }
  }

  const requestConfig: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body && method !== "GET") {
    requestConfig.body = JSON.stringify(body);
  }

  try {
    const request = await fetch(url, requestConfig);

    // Handle 401 with token refresh retry
    if (request.status === 401 && retryCount === 0) {
      const refreshSuccess = await attemptTokenRefresh();

      if (refreshSuccess) {
        // Retry the original request with refreshed token
        return makeRequest(endpoint, config, 1);
      } else {
        // Refresh failed, redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    }

    const response: ApiResponse<T> = await request.json();

    if (!request.ok) {
      const error = new Error(response.message || "Request failed");
      Object.assign(error, {
        status: request.status,
        code: response.code,
        requestId: response.requestId,
      });
      throw error;
    }

    return response;
  } catch (error) {
    console.log({ error });
    if (error instanceof Error && "status" in error) {
      throw error;
    }

    throw new Error(error instanceof Error ? error.message : "Network error");
  }
}
