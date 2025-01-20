import { useCallback, useEffect, useState } from "react";

import {
  ApiFailedResponse,
  ApiResponse,
  ApiSuccessfulResponse,
  ConditionalFunctionParams,
} from "@/types";

export type Api<T, P = void> = (
  ...params: ConditionalFunctionParams<P>
) => Promise<ApiResponse<T>>;

export function useApi<T, P = void>(
  promiseFunction: Api<T, P>,
  dependencies: any[] = [],
  params: Parameters<Api<T, P>>
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
  promiseFunction: Api<T, P>,
  dependencies: any[] = []
) {
  return useApiCreator(promiseFunction, dependencies, false);
}

function useApiCreator<T, P>(
  promiseFunction: Api<T, P>,
  dependencies: any[],
  initialLoading: boolean
) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<ApiFailedResponse["error"]>();
  const [value, setValue] = useState<ApiSuccessfulResponse<T>["result"]>();

  const execute = useCallback(
    async (
      ...params: ConditionalFunctionParams<P>
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
