import express from "express";

import { errorMiddleware } from "@/middlewares";

import createRouter from "./createRouter";
import useGeneralMiddlewares from "./useGeneralMiddleware";

function useMiddlewares(app: express.Express) {
  useGeneralMiddlewares(app);

  const router = createRouter();

  app.use("/api", router);
  app.use(errorMiddleware);
}

export default useMiddlewares;
