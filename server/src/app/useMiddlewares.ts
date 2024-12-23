import express from "express";

import ErrorController from "@/controllers/error.controller";

import createRouter from "./createRouter";
import useGeneralMiddlewares from "./useGeneralMiddleware";

function useMiddlewares(app: express.Express) {
  const errorMiddleware = new ErrorController().error;

  useGeneralMiddlewares(app);

  app.use("/api", createRouter());

  app.use(errorMiddleware);
}

export default useMiddlewares;
