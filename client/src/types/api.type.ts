import { EmptyObject, TypeOrTypeArray } from "./common.type";

export type ApiMethodsWithBody = "POST" | "PUT" | "DELETE";
export type ApiMethodsWithoutBody = "GET";

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
