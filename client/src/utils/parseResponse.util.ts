import { toast } from "react-toastify";

import { ApiFailedResponse, ApiResponse, ApiSuccessfulResponse } from "@/types";

import { parseTypeOrTypeArray } from "./common.util";

function toastResponseError(error: ApiFailedResponse["error"]) {
  const DELAY_FACTOR = 500;
  parseTypeOrTypeArray(error).forEach((message, index) => {
    toast.error(message, { delay: index * DELAY_FACTOR });
  });
}

export function parseResponse<T = any>(
  response: ApiResponse<T>,
  successfulCallback?: (
    successfulResult: ApiSuccessfulResponse<T>["result"]
  ) => void,
  isToastSuccessfulMessageNeed = true
) {
  if (response.isSuccessful) {
    if (isToastSuccessfulMessageNeed) {
      toast.success(response.result.message);
    }
    return successfulCallback?.(response.result);
  }

  toastResponseError(response.error);
}
