import axios from "axios";

import env from "@/constants/env";
import { createHttpMethodWithBody, createHttpMethodWithoutBody } from "@/utils";

export const http = axios.create({
  baseURL: env.VITE_API_END_POINT,
  headers: { "Content-Type": "application/json" },
  timeout: env.VITE_REQUEST_TIMEOUT,
});

export const HTTP = {
  get: createHttpMethodWithoutBody("GET"),
  post: createHttpMethodWithBody("POST"),
  put: createHttpMethodWithBody("PUT"),
  delete: createHttpMethodWithBody("DELETE"),
};

export function setTokenToHeaders(token: string) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function deleteTokenFromHeaders() {
  http.defaults.headers.common.Authorization = undefined;
}
