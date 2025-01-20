import { ConditionalFunctionParams, TypeOrTypeArray } from "./general.type";

export type ApiMethodsWithBody = "POST" | "PUT" | "DELETE";
export type ApiMethodsWithoutBody = "GET";
export type ApiMethods = ApiMethodsWithBody | ApiMethodsWithoutBody;

export type ApiResponse<T = unknown> =
  | ApiSuccessfulResponse<T>
  | ApiFailedResponse;

export type ApiSuccessfulResponse<T = unknown> = {
  isSuccessful: true;
  result: {
    data: T;
    message: string;
  };
};

export type ApiFailedResponse = {
  isSuccessful: false;
  error: TypeOrTypeArray<string>;
};

export type Api<T, P = void> = (
  ...params: ConditionalFunctionParams<P>
) => Promise<ApiResponse<T>>;

export type ApiWrapper<P = void> = (
  ...params: ConditionalFunctionParams<P>
) => Promise<void>;
