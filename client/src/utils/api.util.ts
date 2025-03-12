import { toast } from "react-toastify";

import autoBind from "auto-bind";

import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";
import {
  ApiResponse,
  ApiResult,
  EntityKey,
  IApiError,
  ICrudApi,
  PaginateQuery,
  TGetAllResponse,
  TypeOrTypeArray,
} from "@/types";

import { parseTypeOrTypeArray } from "./general.util";

export function toastApiResponseError(error: IApiError) {
  const DELAY_FACTOR = 500;
  error.messages.forEach((message, index) => {
    toast.error(message, { delay: index * DELAY_FACTOR });
  });
}

type ParseResponseOptions = {
  isToastSuccessfulMessageNeed?: boolean;
  isToastErrorMessageNeed?: boolean;
};

export function parseApiResponse<T = any>(
  response: ApiResponse<T> | void,
  successfulCallback?: (successfulResult: ApiResult<T>) => void,
  {
    isToastSuccessfulMessageNeed = true,
    isToastErrorMessageNeed = true,
  }: ParseResponseOptions = {}
) {
  if (response == null) return;

  if (response.isSuccessful) {
    if (isToastSuccessfulMessageNeed) {
      toast.success(response.result.message);
    }
    return successfulCallback?.(response.result);
  }

  if (!isToastErrorMessageNeed) return;
  toastApiResponseError(response.error);
}

export class CrudApi<
  GetAllResponse,
  GetByIdResponse,
  CreateData,
  EntityResponse = { id: string },
  Q extends PaginateQuery = PaginateQuery,
> implements
    ICrudApi<GetAllResponse, GetByIdResponse, CreateData, EntityResponse, Q>
{
  private entityPath: (typeof PATH)["base"][EntityKey];

  constructor(entityKey: EntityKey) {
    autoBind(this);
    this.entityPath = PATH.base[entityKey];
  }

  private pathEntity(id: string) {
    return `${this.entityPath}/${id}`;
  }

  getAll(query?: Q) {
    return HTTP.get<TGetAllResponse<GetAllResponse>>(this.entityPath, {
      params: query,
    });
  }

  getById({ id }: { id: string }) {
    return HTTP.get<GetByIdResponse>(this.pathEntity(id));
  }

  create({ data }: { data: CreateData }) {
    return HTTP.post<EntityResponse>(this.entityPath, { data });
  }

  update({ id, data }: { id: string; data: Partial<CreateData> }) {
    return HTTP.put<EntityResponse>(this.pathEntity(id), { data });
  }

  delete({ id }: { id: string }) {
    return HTTP.delete<{ id: string }>(this.pathEntity(id));
  }
}

export class ApiError extends Error implements IApiError {
  readonly messages: string[];
  constructor(messages: TypeOrTypeArray<string>, message?: string) {
    super(message);
    this.messages = parseTypeOrTypeArray(messages);
  }
}
