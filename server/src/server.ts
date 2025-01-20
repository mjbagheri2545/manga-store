import "module-alias/register";
import "express-async-errors";

import { config } from "dotenv";

import startServer from "./app";

config({ path: `.env.${process.env.NODE_ENV ?? "development"}.local` });

startServer();
