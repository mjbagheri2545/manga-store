import { AxiosRequestConfig } from "axios";

import { PromiseFunction } from "./general.type";

export type HttpMethodsWithBody = "POST" | "PUT" | "DELETE";
export type HttpMethodsWithoutBody = "GET";
export type HttpMethods = HttpMethodsWithBody | HttpMethodsWithoutBody;

export type ApiResponse<T = unknown> =
  | ApiSuccessfulResponse<T>
  | ApiFailedResponse;

type ApiSuccessfulResponse<T = unknown> = {
  isSuccessful: true;
  result: {
    data: T;
    message: string;
  };
};

export type ApiResult<T> = ApiSuccessfulResponse<T>["result"];
export interface IApiError extends Error {
  messages: string[];
}

type ApiFailedResponse = {
  isSuccessful: false;
  error: IApiError;
};

export type HttpOptions<T, M extends HttpMethods> = AxiosRequestConfig & {
  method?: T extends never ? HttpMethodsWithoutBody : HttpMethodsWithBody;
  data?: M extends HttpMethodsWithoutBody ? never : T;
};

export type ApiMethod<T = unknown, P = void> = PromiseFunction<
  ApiResponse<T>,
  P
>;

export type ApiMethodWrapper<P = void> = (
  ...params: P extends void ? [] : [params: P]
) => Promise<void>;

export type PaginateQuery = { skip?: number; take?: number };

export type QueryWithSort = { sort?: string };

export type PaginateQueryWithSort = PaginateQuery & QueryWithSort;

export type TGetAllResponse<T> = T & { count: number };

export interface ICrudApi<
  GetAllResponse = unknown,
  GetByIdResponse = unknown,
  CreateData = unknown,
  EntityResponse = { id: string },
  Q extends PaginateQuery = PaginateQuery,
> {
  getAll: ApiMethod<TGetAllResponse<GetAllResponse>, Q | undefined>;
  getById: ApiMethod<GetByIdResponse, { id: string }>;
  create: ApiMethod<EntityResponse, { data: CreateData }>;
  update: ApiMethod<EntityResponse, { id: string; data: Partial<CreateData> }>;
  delete: ApiMethod<{ id: string }, { id: string }>;
}
