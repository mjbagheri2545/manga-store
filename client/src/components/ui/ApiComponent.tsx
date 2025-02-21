import { useApi, UseApiArgs, UseApiOptions } from "@/lib/api";
import { ApiMethod, ApiResult, IsRequiredParam } from "@/types";
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

type ApiOptionsProps<T, P> =
  IsRequiredParam<P> extends true
    ? { apiOptions: UseApiOptions<T, P> }
    : { apiOptions?: UseApiOptions<T, P> };

type ApiComponentProps<T, P> = {
  children: (result: ApiResult<T>) => React.ReactNode;
  spinnerContainerProps?: SpinnerContainerProps;
  apiMethod: ApiMethod<T, P>;
} & ApiOptionsProps<T, P> &
  ErrorProps;

function ApiComponent<T, P = void>({
  children,
  spinnerContainerProps,
  apiMethod,
  apiOptions,
  ...restProps
}: ApiComponentProps<T, P>) {
  const { error, result, status } = useApi(
    apiMethod,
    ...([{ dependencies: [apiMethod], ...apiOptions }] as UseApiArgs<T, P>)
  );

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
