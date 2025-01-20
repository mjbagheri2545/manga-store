import http from "http";

import env from "@/constants/env";
import { errorLogger } from "@/constants/loggers";
import { getError } from "@/utils";

import createApp from "./createApp";

function startServer() {
  const app = createApp();
  const server = http.createServer(app);
  server.listen({ host: env.HOST, port: env.PORT }, () => {
    console.log(`server started at http://${env.HOST}:${env.PORT}`);
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
