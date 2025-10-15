interface FetchUtilOptions extends Omit<RequestInit, 'body' | 'method'> {
  headers?: Record<string, string>;
  requireAuth?: boolean;
  retries?: number;
  retryDelay?: number;
}

interface FetchUtilParams {
  url: string;
  method: keyof typeof httpMethods;
  body?: unknown;
  options?: FetchUtilOptions;
}

interface FetchUtilResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

export const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = typeof httpMethods[keyof typeof httpMethods];

export const fetchUtil = async <T = unknown>({
  url,
  method,
  body,
  options = {},
}: FetchUtilParams): Promise<FetchUtilResponse<T>> => {
  const requestUrl = url.startsWith('http') ? url : `${import.meta.env.VITE_API_BASE_URL || ''}${url}`;
  const { requireAuth = true, headers = {}, ...restOptions } = options;
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (requireAuth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }
  try {
    const response = await fetch(requestUrl, {
      method,
      headers: requestHeaders,
      ...restOptions,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false,
        error: data.message || response.statusText || 'An error occurred',
        status: response.status 
      };
    }

    return { 
      success: true,
      ...data as T, // spreads server response directly
      status: response.status 
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
    return { 
      success: false,
      error: errorMessage 
    };
  }
}
