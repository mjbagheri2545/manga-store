import { TypeOrTypeArray } from "./common.type";

export type ApiMethodsWithBody = "POST" | "PUT" | "DELETE";
export type ApiMethodsWithoutBody = "GET";

export type ApiResponse<T> = ApiSuccessfulResponse<T> | ApiFailedResponse;

export type ApiSuccessfulResponse<T> = {
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
