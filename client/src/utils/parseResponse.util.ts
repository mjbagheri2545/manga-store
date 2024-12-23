import { toast } from "react-toastify";

import { ApiFailedResponse, ApiResponse, ApiSuccessfulResponse } from "@/types";

import { parseTypeOrTypeArray } from "./general.util";

function toastResponseError(error: ApiFailedResponse["error"]) {
  const DELAY_FACTOR = 500;
  parseTypeOrTypeArray(error).forEach((message, index) => {
    toast.error(message, { delay: index * DELAY_FACTOR });
  });
}

type ParseResponseOptions = {
  isToastSuccessfulMessageNeed?: boolean;
};

export function parseResponse<T = any>(
  response: ApiResponse<T>,
  successfulCallback?: (
    successfulResult: ApiSuccessfulResponse<T>["result"]
  ) => void,
  { isToastSuccessfulMessageNeed = true }: ParseResponseOptions = {}
) {
  if (response.isSuccessful) {
    if (isToastSuccessfulMessageNeed) {
      toast.success(response.result.message);
    }
    return successfulCallback?.(response.result);
  }

  toastResponseError(response.error);
}
