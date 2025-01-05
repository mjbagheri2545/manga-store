import { Request } from "express";

import morgan from "morgan";

import { httpLogger } from "@/constants/loggers";

const statusCodeColor = {
  "400": "\x1b[31m",
  "300": "\x1b[36m",
  "200": "\x1b[32m",
};

morgan.token("headers", (req: Request) =>
  JSON.stringify({
    "content-type": req.headers["content-type"],
    "user-agent": req.headers["user-agent"],
    authorization: req.headers["authorization"] ? "[REDACTED]" : undefined,
  })
);

morgan.token("query", (req: Request) => JSON.stringify(req.query));

morgan.token("timestamp", () => new Date().toISOString());

morgan.token("status-color", (_req, res) => {
  const { statusCode } = res;
  for (const key of Object.keys(statusCodeColor)) {
    if (statusCode >= parseInt(key)) {
      const color = statusCodeColor[key as keyof typeof statusCodeColor];
      return `${color}${statusCode}\x1b[0m`;
    }
  }
});
morgan.token("body", (req: Request) => {
  if (req.headers["content-type"]?.includes("multipart/form-data")) {
    return "[File upload omitted]";
  }
  const body = JSON.stringify(req.body ?? "{}");
  return body.length > 1000 ? "[Body too large]" : body;
});

const customFormat = `[:timestamp] :method :url :status :status-color :response-time ms - :res[content-length] | IP: :ip | Query: :query | User-Agent: :user-agent | Body: :body\x1b[0m | Headers: :headers`;

function getLevel(message: string) {
  return message.match(/4\d{2}/)
    ? "error"
    : message.match(/3\d{2}/)
      ? "warn"
      : "info";
}

export const morganMiddleware = morgan(customFormat, {
  stream: {
    write: (message) => {
      const level = getLevel(message);
      httpLogger.log(level, message.trim());
    },
  },
});
