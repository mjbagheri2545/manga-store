import { useCallback, useReducer } from "react";

import {
  DEFAULT_RETRY,
  DEFAULT_RETRY_DELAY,
} from "@/constants/global/general.global";
import { ApiMethod } from "@/types";
import { wait, withCatch } from "@/utils";

import {
  failedRequest,
  initialRequestState,
  requestReducer,
  sendRequest,
  successfulRequest,
} from "./reducer";
import {
  RequestStatus,
  UseApiCallbackArgs,
  UseApiResult,
  UseBaseApiOptions,
} from "./type";
import useRequest from "./useRequest";

function useBaseApi<T, P>(
  apiMethod: ApiMethod<T, P>,
  { dependencies = [], onError, onSuccess }: UseBaseApiOptions<T> = {},
  initialStatus: RequestStatus = "idle"
) {
  const [state, dispatch] = useReducer(
    requestReducer<T>,
    initialRequestState<T>(initialStatus)
  );

  const request = useRequest(apiMethod, dependencies);

  const refetch = useCallback(
    async (...args: UseApiCallbackArgs<T, P>) => {
      const options = {
        retry: DEFAULT_RETRY,
        retryDelay: DEFAULT_RETRY_DELAY,
        isRetrying: true,
        ...(args[0] ?? {}),
      };

      async function retryRequest(retry: number, delay: number) {
        // i use withCatchResult because i want to infer return type
        // as withCatch return type
        const withCatchResult = await withCatch(request(...args));
        const [error, response] = withCatchResult;
        const canRetry =
          (error != null || !response?.isSuccessful) && retry > 1;

        if (canRetry) {
          await wait(delay);
          return retryRequest(retry - 1, delay + options.retryDelay);
        }

        return withCatchResult;
      }

      const requestPromise = options.isRetrying
        ? retryRequest(options.retry, options.retryDelay)
        : withCatch(request(...args));

      const [error, response] = await requestPromise;

      // previous request aborted
      if (error != null) return;

      // i'm using options.onSuccess here because i don't want
      // global onSuccess for refetch and if i need onSuccess
      // use it.
      if (response.isSuccessful) {
        dispatch(successfulRequest(response.result));

        if (options.onSuccess != null) {
          options.onSuccess(response.result);
        }
      } else {
        dispatch(failedRequest(response.error));

        if (options.onError != null) {
          options.onError(response.error);
        }
      }

      return response;
    },
    [request]
  );

  const execute = useCallback(
    async (...args: UseApiCallbackArgs<T, P>) => {
      dispatch(sendRequest());
      const response = await refetch(...args);

      const options = args[0] ?? {};

      // global onSuccess called here and because i don't want
      // call global onSuccess in refetch as i say above
      if (response != null) {
        if (response.isSuccessful) {
          if (onSuccess != null && options.onSuccess == null) {
            onSuccess(response.result);
          }
        } else {
          if (onError != null && options.onError == null) {
            onError(response.error);
          }
        }
      }

      return response;
    },
    [refetch]
  );

  return {
    ...state,
    execute,
    refetch,
  } as UseApiResult<T, P>;
}

export default useBaseApi;
