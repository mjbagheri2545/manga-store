import { toast } from "react-toastify";

import {
  Api,
  ApiFailedResponse,
  ApiResponse,
  ApiSuccessfulResponse,
  ConditionalFunctionParams,
} from "@/types";

import { parseTypeOrTypeArray } from "./general.util";

function toastResponseError(error: ApiFailedResponse["error"]) {
  const DELAY_FACTOR = 500;
  parseTypeOrTypeArray(error).forEach((message, index) => {
    toast.error(message, { delay: index * DELAY_FACTOR });
  });
}

type ParseResponseOptions = {
  isToastSuccessfulMessageNeed?: boolean;
  isToastErrorMessageNeed?: boolean;
};

export function parseApiResponse<T = any>(
  response: ApiResponse<T>,
  successfulCallback?: (
    successfulResult: ApiSuccessfulResponse<T>["result"]
  ) => void,
  {
    isToastSuccessfulMessageNeed = true,
    isToastErrorMessageNeed = true,
  }: ParseResponseOptions = {}
) {
  if (response.isSuccessful) {
    if (isToastSuccessfulMessageNeed) {
      toast.success(response.result.message);
    }
    return successfulCallback?.(response.result);
  }

  if (!isToastErrorMessageNeed) return;
  toastResponseError(response.error);
}

export function apiWithAutoParseResponse<T, P = void>(
  apiPromise: Api<T, P>,
  options: ParseResponseOptions = { isToastSuccessfulMessageNeed: true }
) {
  return async function (...params: ConditionalFunctionParams<P>) {
    const response = await apiPromise(...params);
    parseApiResponse(response, undefined, options);
  };
}
