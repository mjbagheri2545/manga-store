import { useApi, UseApiOptions } from "@/lib/api";
import { ApiMethod } from "@/types";

import { SpinnerContainer, SpinnerContainerProps } from "../SpinnerContainer";
import {
  ApiErrorMessageList,
  ApiErrorMessageListProps,
} from "./ApiErrorMessageList";

export type ApiComponentProps<T> = {
  children: (data: T) => React.ReactNode;
  spinnerContainerProps?: SpinnerContainerProps;
  apiMethod: ApiMethod<T, void>;
  apiMethodOptions?: UseApiOptions<T, void>;
  errorMessageListProps?: Omit<ApiErrorMessageListProps, "error">;
};

export function ApiComponent<T>({
  children,
  spinnerContainerProps,
  apiMethod,
  apiMethodOptions,
  ...restProps
}: ApiComponentProps<T>) {
  const { error, result, status } = useApi(apiMethod, apiMethodOptions);

  if (status === "pending") {
    return <SpinnerContainer {...spinnerContainerProps} />;
  }

  if (status === "error") {
    return (
      <ApiErrorMessageList error={error} {...restProps.errorMessageListProps} />
    );
  }

  return <>{children(result.data)}</>;
}
