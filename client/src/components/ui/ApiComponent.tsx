import { useApi, UseApiOptions } from "@/lib/api";
import { ApiMethod, ApiResult } from "@/types";
import { toastApiResponseError } from "@/utils";

import ApiErrorMessageList, {
  ApiErrorMessageListProps,
} from "./ApiErrorMessageList";
import { SpinnerContainer, SpinnerContainerProps } from "./SpinnerContainer";

type ErrorProps =
  | {
      isToastError: true;
    }
  | {
      errorMessageListProps?: Omit<ApiErrorMessageListProps, "error">;
    };

type ApiComponentProps<T> = {
  children: (result: ApiResult<T>) => React.ReactNode;
  spinnerContainerProps?: SpinnerContainerProps;
  apiMethod: ApiMethod<T, void>;
  apiMethodOptions?: UseApiOptions<T, void>;
} & ErrorProps;

function ApiComponent<T>({
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
    if ("isToastError" in restProps) {
      toastApiResponseError(error);
      return;
    }

    return (
      <ApiErrorMessageList error={error} {...restProps.errorMessageListProps} />
    );
  }

  return <>{children(result)}</>;
}

export default ApiComponent;
