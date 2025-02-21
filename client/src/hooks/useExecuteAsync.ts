import { useCallback, useState } from "react";

import { IsRequiredParam, PromiseFunction } from "@/types";
import { withCatch } from "@/utils";

type useExecuteAsyncArgs<P> =
  IsRequiredParam<P> extends true
    ? [options: { params: P }]
    : void extends P
      ? []
      : [options?: { params?: P }];

type useExecuteAsyncResultStatus<T> =
  | { isLoading: true; error: undefined; value: undefined }
  | { isLoading: false; error: undefined; value: T }
  | { isLoading: false; error: undefined; value: T };

type useExecuteAsyncResult<T, P> = {
  execute: (
    ...args: useExecuteAsyncArgs<P>
  ) => Promise<[Error] | [undefined, T]>;
} & useExecuteAsyncResultStatus<T>;

export function useExecuteAsync<T = unknown, P = void>(
  promiseFunction: PromiseFunction<T, P>,
  dependencies: any[] = []
): useExecuteAsyncResult<T, P> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [value, setValue] = useState<T>();

  const execute = useCallback(
    async (...args: useExecuteAsyncArgs<P>) => {
      setIsLoading(true);
      const [error, value] = await withCatch(
        promiseFunction(...(args as [params: P]))
      );

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
    [promiseFunction, ...dependencies]
  );

  return { isLoading, error, value, execute } as useExecuteAsyncResult<T, P>;
}
