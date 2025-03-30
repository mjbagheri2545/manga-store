import { useCallback, useEffect } from "react";

import { ApiMethod } from "@/types";
import { toastApiResponseError } from "@/utils";

import {
  EventsOptions,
  IdleStatus,
  Options,
  SignalOptions,
  UseApiArgs,
  UseApiCallback,
  UseApiCallbackArgs,
  UseApiResult,
  UseApiResultStatus,
  UseBaseApiOptions,
} from "./type";
import useBaseApi from "./useBaseApi";

export function useApi<T, P = void>(
  apiMethod: ApiMethod<T, P>,
  ...[options = { isEnabled: true }]: UseApiArgs<T, P>
) {
  const { execute, ...rest } = useBaseApi(
    apiMethod,
    { dependencies: options.dependencies },
    "pending"
  );

  useEffect(() => {
    if (options.isEnabled != null && !options.isEnabled) return;

    const restOptions = {
      signal: options.signal,
      isRetrying: true,
    };

    const executeArgs = (
      "params" in options
        ? [{ params: options.params, ...restOptions }]
        : [restOptions]
    ) as UseApiCallbackArgs<T, P>;

    execute(...executeArgs);
  }, [execute, options.signal, options.isEnabled]);

  return rest as Exclude<UseApiResultStatus<T>, IdleStatus> &
    Pick<UseApiResult<T, P>, "refetch">;
}

export function useExecuteApi<T, P = void>(
  apiMethod: ApiMethod<T, P>,
  options?: UseBaseApiOptions<T>
) {
  return useBaseApi<T, P>(apiMethod, options);
}

export function useMutation<T, P = void>(
  apiMethod: ApiMethod<T, P>,
  options?: UseBaseApiOptions<T>
) {
  const {
    refetch: _,
    execute,
    ...state
  } = useBaseApi<T, P>(apiMethod, {
    onError: toastApiResponseError,
    ...options,
  });

  const mutate: UseApiCallback<T, P, SignalOptions & EventsOptions<T>> =
    useCallback(
      (...args: UseApiCallbackArgs<T, P>) => {
        const options = { ...args[0], isRetrying: false };

        return execute(...([options] as UseApiCallbackArgs<T, P, Options<T>>));
      },
      [execute]
    );

  return { mutate, ...state };
}
