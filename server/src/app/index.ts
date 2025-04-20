import http from "http";

import env from "@/constants/env";
import { errorLogger } from "@/constants/loggers";
import { getError } from "@/utils";

import createApp from "./createApp";

function startServer() {
  const app = createApp();
  const server = http.createServer(app);
  server.listen({ port: env.PORT }, () => {
    console.log(`server started with port ${env.PORT}`);
  });

  const signals: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];
  signals.forEach((signal) => {
    process.once(signal, () => {
      server.close((error) => {
        errorLogger.logMessage(getError(error));
      });
    });
  });
}

export default startServer;
