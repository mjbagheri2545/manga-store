import express from "express";

import { errorMiddleware } from "@/middlewares";

import router from "./createRouter";
import useGeneralMiddlewares from "./useGeneralMiddleware";

function useMiddlewares(app: express.Express) {
  useGeneralMiddlewares(app);

  app.use("/api", router);

  app.use(errorMiddleware);
}

export default useMiddlewares;
