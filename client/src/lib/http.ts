import axios, { AxiosRequestConfig, isAxiosError } from "axios";

import env from "@/constants/env";
import SHARED_MESSAGES from "@/constants/messages";
import {
  ApiResponse,
  ApiResult,
  HttpMethods,
  HttpMethodsWithBody,
  HttpMethodsWithoutBody,
  TypeOrTypeArray,
} from "@/types";
import { ApiError, withCatch } from "@/utils";

const http = axios.create({
  baseURL: env.VITE_API_END_POINT,
  headers: { "Content-Type": "application/json" },
  timeout: env.VITE_REQUEST_TIMEOUT,
});

// string[] because error.response?.data?.message maybe is string[]
function getFailedResponseErrorMessages(error: Error): TypeOrTypeArray<string> {
  return isAxiosError(error)
    ? (error.response?.data?.message ?? error.message)
    : SHARED_MESSAGES.general.unexpectedError(error.message);
}

type HttpOptions<T, M extends HttpMethods> = AxiosRequestConfig & {
  method?: T extends never ? HttpMethodsWithoutBody : HttpMethodsWithBody;
  data?: M extends HttpMethodsWithoutBody ? never : T;
};

function createHttpMethod<M extends HttpMethods>(method: M) {
  return async function <V = unknown, T = unknown>(
    url: string,
    options?: HttpOptions<T, M>
  ): Promise<ApiResponse<V>> {
    const request = http<ApiResult<V>>({
      url,
      method,
      ...options,
    });

    const [error, response] = await withCatch(request);

    if (error != null) {
      return {
        isSuccessful: false,
        error: new ApiError(getFailedResponseErrorMessages(error)),
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
