import { useCallback, useEffect, useState } from "react";

import { ApiFailedResponse, ApiResponse, ApiSuccessfulResponse } from "@/types";

type ApiPromise<T, P = void> = (
  ...params: P extends void ? [] : [P]
) => Promise<ApiResponse<T>>;

export function useApi<T, P = void>(
  promiseFunction: ApiPromise<T, P>,
  dependencies: any[] = [],
  params: Parameters<ApiPromise<T, P>>
) {
  const { execute, ...rest } = useApiCreator(
    promiseFunction,
    dependencies,
    true
  );

  useEffect(() => {
    execute(...params);
  }, [execute]);

  return rest;
}

export function useExecuteApi<T, P = void>(
  promiseFunction: ApiPromise<T, P>,
  dependencies: any[] = []
) {
  return useApiCreator(promiseFunction, dependencies, false);
}

function useApiCreator<T, P>(
  promiseFunction: ApiPromise<T, P>,
  dependencies: any[],
  initialLoading: boolean
) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<ApiFailedResponse["error"]>();
  const [value, setValue] = useState<ApiSuccessfulResponse<T>["result"]>();

  const execute = useCallback(
    async (
      ...params: P extends void ? [] : [props: P]
    ): Promise<ApiResponse<T>> => {
      setIsLoading(true);

      const response = await promiseFunction(...params);

      if (response.isSuccessful) {
        setValue(response.result);
        setError(undefined);
      } else {
        setValue(undefined);
        setError(response.error);
      }

      setIsLoading(false);

      return response;
    },
    dependencies
  );

  return { isLoading, error, value, execute };
}
