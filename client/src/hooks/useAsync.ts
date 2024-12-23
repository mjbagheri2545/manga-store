import { useCallback, useEffect, useState } from "react";

import { withCatch } from "@/utils";

type PromiseFunction<T, P = void> = (
  ...params: P extends void ? [] : [P]
) => Promise<T>;

export function useAsync<T = void, P = void>(
  promiseFunction: PromiseFunction<T, P>,
  dependencies: any[] = [],
  params: Parameters<PromiseFunction<T, P>>
) {
  const { execute, ...rest } = useAsyncCreator(
    promiseFunction,
    dependencies,
    true
  );

  useEffect(() => {
    execute(...params);
  }, [execute]);

  return rest;
}

export function useExecuteAsync<T = void, P = void>(
  promiseFunction: PromiseFunction<T, P>,
  dependencies: any[] = []
) {
  return useAsyncCreator(promiseFunction, dependencies, false);
}

function useAsyncCreator<T, P>(
  promiseFunction: PromiseFunction<T, P>,
  dependencies: any[],
  initialLoading: boolean
) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<Error>();
  const [value, setValue] = useState<T>();

  const execute = useCallback(
    async (...params: P extends void ? [] : [props: P]) => {
      setIsLoading(true);
      const [error, value] = await withCatch(promiseFunction(...params));

      if (error != null) {
        setError(error);
        setValue(undefined);
        setIsLoading(false);

        return [error];
      }
      setError(undefined);
      setValue(value);
      setIsLoading(false);

      return [error, value];
    },
    dependencies
  );

  return { isLoading, error, value, execute };
}
