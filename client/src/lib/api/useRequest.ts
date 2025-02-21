import { useCallback, useRef } from "react";

import { ApiMethod, ApiResponse } from "@/types";

import { UseApiCallbackArgs } from "./type";

function useRequest<T, P>(apiMethod: ApiMethod<T, P>, dependencies: any[]) {
  const abortControllerRef = useRef<AbortController | null>(null);

  const request = useCallback(
    async (
      ...[options = {}]: UseApiCallbackArgs<T, P>
    ): Promise<ApiResponse<T>> => {
      return new Promise((resolve, reject) => {
        if (abortControllerRef.current != null) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        const signal =
          options.signal != null
            ? AbortSignal.any([
                options.signal,
                abortControllerRef.current.signal,
              ])
            : abortControllerRef.current.signal;

        const onAbort = () => reject();

        signal.addEventListener("abort", onAbort);

        const apiMethodArgs = "params" in options ? [options.params] : [];

        apiMethod(...(apiMethodArgs as [params: P]))
          .then(resolve)
          .catch(reject);
      });
    },
    [apiMethod, ...dependencies]
  );

  return request;
}

export default useRequest;
