import { ApiResponse, ApiResult, IApiError, IsRequiredParam } from "@/types";
import { ApiError } from "@/utils";

// all of this complex types is for this:
// when we have don't have params like this:
// () => Promise<ApiResponse<Example>>
// or when we have some optional params like this:
// (query?: {skip?: number, take?: number})

// if you have question why i use types for args and using array types,
// this is just because when we optional params and realize it with
// IsRequiredParams then we need to also use optional args
// if we don't use array type like this:
// IsRequiredParam<P> extends true
// ? [options: { params: P } & O]
// : [options?: void extends P ? O : { params?: P } & O];
// then we have to pass undefined or void as params like this:
// execute(undefined) because of this (options: P | undefined)
// so i'm using [options?: P] then we don't need to pass undefined

export type UseApiOptions<T, P> = UseApiCallbackArgs<T, P>["0"] & {
  dependencies?: any[];
  isEnabled?: boolean;
};

export type UseApiArgs<T, P = void> =
  IsRequiredParam<P> extends true
    ? [options: UseApiOptions<T, P>]
    : [options?: UseApiOptions<T, P>];

export type UseMutationArgs<T, P> = UseApiCallbackArgs<
  T,
  P,
  SignalOptions & EventsOptions<T>
>;

export type UseBaseApiOptions<T> = {
  dependencies?: any[];
} & EventsOptions<T>;

export type SignalOptions = { signal?: AbortSignal };

type RetryOptions =
  | {
      retry?: number;
      retryDelay?: number;
      isRetrying?: true;
    }
  | { isRetrying: false };

export type EventsOptions<T> = {
  onSuccess?: (result: ApiResult<T>) => void;
  onError?: (error: ApiError) => void;
};

type Options<T> = RetryOptions & SignalOptions & EventsOptions<T>;

export type UseApiCallbackArgs<T, P, O extends Options<T> = Options<T>> =
  IsRequiredParam<P> extends true
    ? [options: { params: P } & O]
    : [options?: void extends P ? O : { params?: P } & O];

export type UseApiCallback<T, P> = (
  ...args: UseApiCallbackArgs<T, P>
) => Promise<void | ApiResponse<T>>;

export type IdleStatus = {
  status: "idle";
  error: undefined;
  result: undefined;
};

export type UseApiResultStatus<T> =
  | IdleStatus
  | { status: "pending"; error: undefined; result: undefined }
  | { status: "error"; error: IApiError; result: undefined }
  | { status: "success"; error: undefined; result: ApiResult<T> };

export type UseApiResult<T, P> = {
  execute: UseApiCallback<T, P>;
  refetch: UseApiCallback<T, P>;
} & UseApiResultStatus<T>;

export type RequestStatus = UseApiResultStatus<any>["status"];

export type RequestState<T> = {
  status: RequestStatus;
  error?: IApiError;
  result?: ApiResult<T>;
};

export type RequestAction<T> =
  | { type: "SEND_REQUEST" }
  | { type: "REQUEST_FAILED"; payload: { error: IApiError } }
  | { type: "REQUEST_SUCCESSFUL"; payload: { result: ApiResult<T> } };
