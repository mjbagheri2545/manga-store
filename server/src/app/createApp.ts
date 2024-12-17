import express from "express";

import createRouter from "./createRouter";
import deleteUnusedData from "./deleteUnusedData";
import handleErrors from "./handleErrors";
import useMiddlewares from "./useMiddlewares";

function createApp(): express.Express {
  const app = express();

  handleErrors();
  useMiddlewares(app);
  app.use("/api", createRouter());
  deleteUnusedData();

  return app;
}

export default createApp;
