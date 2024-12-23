import { AxiosRequestConfig, isAxiosError } from "axios";

import { http } from "@/lib/axios";
import {
  ApiFailedResponse,
  ApiMethodsWithBody,
  ApiMethodsWithoutBody,
  ApiResponse,
  ApiSuccessfulResponse,
} from "@/types";

import { withCatch } from "./general.util";

function getFailedResponseError(error: Error): ApiFailedResponse["error"] {
  return isAxiosError(error)
    ? (error.response?.data?.message ?? error.message)
    : `An unexpected error happened with message: ${error.message}`;
}

type MethodsWithoutBodyAxiosOptions = AxiosRequestConfig & {
  method?: ApiMethodsWithoutBody;
  data: never;
};

export function createHttpMethodWithBody(method: ApiMethodsWithBody) {
  return async function <T = unknown, V = unknown>(
    url: string,
    options?: AxiosRequestConfig<T>
  ): Promise<ApiResponse<V>> {
    const request = http<ApiSuccessfulResponse<V>["result"]>({
      url,
      method,
      withCredentials: true,
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

export function createHttpMethodWithoutBody(method: ApiMethodsWithoutBody) {
  return async function <V = unknown>(
    url: string,
    options?: MethodsWithoutBodyAxiosOptions
  ): Promise<ApiResponse<V>> {
    const request = http<ApiSuccessfulResponse<V>["result"]>({
      url,
      method,
      withCredentials: true,
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
