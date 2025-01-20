import axios, { AxiosRequestConfig, isAxiosError } from "axios";

import env from "@/constants/env";
import {
  ApiFailedResponse,
  ApiMethods,
  ApiMethodsWithBody,
  ApiMethodsWithoutBody,
  ApiResponse,
  ApiSuccessfulResponse,
} from "@/types";
import { withCatch } from "@/utils";

const http = axios.create({
  baseURL: env.VITE_API_END_POINT,
  headers: { "Content-Type": "application/json" },
  timeout: env.VITE_REQUEST_TIMEOUT,
});

function getFailedResponseError(error: Error): ApiFailedResponse["error"] {
  return isAxiosError(error)
    ? (error.response?.data?.message ?? error.message)
    : `An unexpected error happened with message: ${error.message}`;
}

type AxiosOptions<T, M extends ApiMethods> = AxiosRequestConfig & {
  method?: T extends never ? ApiMethodsWithoutBody : ApiMethodsWithBody;
  data: M extends ApiMethodsWithoutBody ? never : T;
};

function createHttpMethod<M extends ApiMethods>(method: M) {
  return async function <V = unknown, T = unknown>(
    url: string,
    options?: AxiosOptions<T, M>
  ): Promise<ApiResponse<V>> {
    const request = http<ApiSuccessfulResponse<V>["result"]>({
      url,
      method,
      ...options,
    });

    const [error, response] = await withCatch(request);

    if (error != null) {
      return {
        isSuccessful: false,
        error: getFailedResponseError(error),
      };
    }

    return { isSuccessful: true, result: response.data };
  };
}

export const HTTP = {
  get: createHttpMethod("GET"),
  post: createHttpMethod("POST"),
  put: createHttpMethod("PUT"),
  delete: createHttpMethod("DELETE"),
};

export function setTokenToHeaders(token: string) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function deleteTokenFromHeaders() {
  http.defaults.headers.common.Authorization = undefined;
}
