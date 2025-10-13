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
  data: T | null;
  error: string | null;
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

    console.log(response)

    if (!response.ok) {
      let errorMessage = 'An error occurred';
      const errorData = await response.json();
      errorMessage = errorData.message || response.statusText || errorMessage;
      return { 
        error: errorMessage, 
        data: null, 
        status: response.status 
      };
    }

    const data = await response.json() as T;
    console.log(data)
    return { data, error: null, status: response.status };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
    return { error: errorMessage, data: null };
  }
}
