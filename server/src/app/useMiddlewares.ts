import express from "express";

import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import env from "@/constants/env";
import { httpLogger } from "@/constants/loggers";

const morganMiddleware = morgan("combined", {
  stream: { write: (message) => httpLogger.log("http", message) },
});

function useMiddlewares(app: express.Express) {
  [
    helmet(),
    cors({ origin: env.CLIENT_END_POINT, credentials: true }),
    cookieParser(),
    json(),
    urlencoded({ extended: true }),
    express.static(path.join(__dirname, "../public")),
    morganMiddleware,
  ].forEach((middleware) => app.use(middleware));
}

export default useMiddlewares;
