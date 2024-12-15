import { AxiosRequestConfig, isAxiosError } from "axios";

import { http } from "@/lib/axios";
import {
  ApiFailedResponse,
  ApiMethodsWithBody,
  ApiMethodsWithoutBody,
  ApiResponse,
  ApiSuccessfulResponse,
} from "@/types";

function getFailedResponseError(error: Error): ApiFailedResponse["error"] {
  return isAxiosError(error)
    ? (error.response?.data ?? { message: error.message, data: undefined })
    : {
        data: undefined,
        message: `An unexpected error happened with message: ${error.message}`,
      };
}

type MethodsWithoutBodyAxiosOptions = AxiosRequestConfig & {
  method?: ApiMethodsWithoutBody;
  data: never;
};

export function createHttpMethodWithBody(method: ApiMethodsWithBody) {
  return async function <T = any, V = any>(
    url: string,
    options?: AxiosRequestConfig<T>
  ): Promise<ApiResponse<V>> {
    try {
      const response = await http<ApiSuccessfulResponse<V>["result"]>({
        url,
        method,
        withCredentials: true,
        ...options,
      });

      return { isSuccessful: true, result: response.data };
    } catch (error) {
      return {
        isSuccessful: false,
        error: getFailedResponseError(error as Error),
      };
    }
  };
}

export function createHttpMethodWithoutBody(method: ApiMethodsWithoutBody) {
  return async function <V = any>(
    url: string,
    options?: MethodsWithoutBodyAxiosOptions
  ): Promise<ApiResponse<V>> {
    try {
      const response = await http<ApiSuccessfulResponse<V>["result"]>({
        url,
        method,
        withCredentials: true,
        ...options,
      });

      return { isSuccessful: true, result: response.data };
    } catch (error) {
      return {
        isSuccessful: false,
        error: getFailedResponseError(error as Error),
      };
    }
  };
}
