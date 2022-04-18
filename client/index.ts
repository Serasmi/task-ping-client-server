import process from "process";

import { startStatusLoop } from "./app";
import { storageFactory } from "./storage";
import ReportServerError from "./errors/ReportServerError";
import { handlersFactory } from "./utils/handlers";
import { processStopSignals } from "../shared/constants";
import { checkedServer } from "./config";

const store = storageFactory();

const { appExitHandler, statusHandler } = handlersFactory({ store });

startStatusLoop({ delay: checkedServer.delay, statusHandler, store });

processStopSignals.forEach((signal) => {
  process.on(signal, () => {
    appExitHandler();
    process.exit(0);
  });
});

process.on("uncaughtException", (err) => {
  if (err instanceof ReportServerError) {
    appExitHandler();
  }

  // you should not throw ReportServerError,
  // but there is no information about this case
  throw err;
});
