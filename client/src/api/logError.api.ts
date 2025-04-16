import { HTTP } from "@/lib/http";

type LogErrorData = {
  message: string;
  componentStack: string | undefined;
};

export function logError(data: LogErrorData) {
  return HTTP.post("/log-client-error", { data });
}
