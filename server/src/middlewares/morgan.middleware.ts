import { Request } from "express";

import morgan from "morgan";

import { requestLogger } from "@/constants/loggers";

morgan.token("headers", (req: Request) =>
  JSON.stringify({
    ContentType: req.headers["content-type"],
    ContentLength: req.headers["content-length"],
  })
);

morgan.token("query", (req: Request) => JSON.stringify(req.query));

export const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      statusCode: Number.parseFloat(tokens.status(req, res) ?? "200"),
      userAgent: tokens["user-agent"](req, res),
      response_time: Number.parseFloat(
        tokens["response-time"](req, res) ?? "0"
      ),
      headers: tokens.headers(req, res),
      query: tokens.query(req, res),
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        requestLogger.http("Incoming Request", data);
      },
    },
  }
);
