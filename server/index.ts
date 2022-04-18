import http from "http";
import process from "process";

import { storageFactory } from "./storage";

import { dataRoute } from "./routes/dataRoute";
import { errorRoute } from "./routes/errorRoute";
import { healthCheckRoute } from "./routes/healthCheckRoute";

import { handlersFactory } from "./utils/handlers";

import { processStopSignals } from "../shared/constants";
import { serverConfig } from "./config";

const { hostname, port } = serverConfig;

const store = storageFactory();

const { appExitHandler, statusHandler } = handlersFactory({ store });

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      healthCheckRoute(req, res);
      break;
    case "/data":
      dataRoute(req, res, { statusHandler });
      break;
    default:
      errorRoute(req, res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});

processStopSignals.forEach((signal) => {
  process.on(signal, () => server.close(appExitHandler));
});
