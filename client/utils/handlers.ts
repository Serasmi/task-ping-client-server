import { logger } from "./loggers";

import type { IStore } from "../types";
import type { IReportMetricStatus, TStatusHandler } from "../../shared/types";

interface IHandlersOptions {
  store: IStore;
}

interface IHandlers {
  appExitHandler: () => void;
  statusHandler: TStatusHandler;
}

const logMetricStatus = ({ metric, status }: IReportMetricStatus): void => {
  const logOptions = { pingId: metric.pingId };

  if (status === 200) {
    logger.info("Server responded with status 200.", logOptions);
    return;
  }

  logger.error(`Report server error. Status: ${status}`, logOptions);
};

export const handlersFactory = ({ store }: IHandlersOptions): IHandlers => {
  const appExitHandler = () => {
    logger.info("Client was stopped. Client statistic: ", {
      statistic: store.getStatistic(),
    });
  };

  const statusHandler: TStatusHandler = ({ metric, status }) => {
    logMetricStatus({ metric, status });
    store.push(status);
  };

  return { appExitHandler, statusHandler };
};
