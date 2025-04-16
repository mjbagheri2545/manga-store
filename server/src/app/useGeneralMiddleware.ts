import express from "express";

import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import env from "@/constants/env";
import { PUBLIC_FOLDER_NAME } from "@/constants/global/general.global";
import { morganMiddleware } from "@/middlewares";

function useGeneralMiddlewares(app: express.Express) {
  [
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          frameAncestors: ["'self'", env.CLIENT_END_POINT],
        },
      },
    }),
    cors({ origin: env.CLIENT_END_POINT, credentials: true }),
    cookieParser(),
    json(),
    urlencoded({ extended: true }),
    express.static(path.join(__dirname, `../../${PUBLIC_FOLDER_NAME}`)),
    morganMiddleware,
  ].forEach((middleware) => app.use(middleware));
}

export default useGeneralMiddlewares;
