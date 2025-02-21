import { ApiResult, IApiError } from "@/types";

import { RequestAction, RequestState, RequestStatus } from "./type";

const ACTIONS = {
  send: "SEND_REQUEST",
  failed: "REQUEST_FAILED",
  successful: "REQUEST_SUCCESSFUL",
} as const satisfies Record<string, RequestAction<any>["type"]>;

export const initialRequestState = <T>(initialStatus: RequestStatus) =>
  ({
    status: initialStatus,
    error: undefined,
    result: undefined,
  }) as RequestState<T>;

export function requestReducer<T>(
  _state: RequestState<T>,
  action: RequestAction<T>
): RequestState<T> {
  switch (action.type) {
    case ACTIONS.send:
      return { error: undefined, result: undefined, status: "pending" };
    case ACTIONS.failed:
      return {
        status: "error",
        error: action.payload.error,
        result: undefined,
      };
    case ACTIONS.successful:
      return {
        status: "success",
        result: action.payload.result,
        error: undefined,
      };
  }
}

export function sendRequest() {
  return { type: ACTIONS.send };
}

export function failedRequest(error: IApiError) {
  return { type: ACTIONS.failed, payload: { error } };
}

export function successfulRequest<T>(result: ApiResult<T>) {
  return { type: ACTIONS.successful, payload: { result } };
}
