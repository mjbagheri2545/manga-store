import express from "express";

import deleteUnusedData from "./deleteUnusedData";
import handleErrors from "./handleErrors";
import useMiddlewares from "./useMiddlewares";

function createApp(): express.Express {
  const app = express();

  handleErrors();
  useMiddlewares(app);
  deleteUnusedData();

  return app;
}

export default createApp;
