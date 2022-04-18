import { logger } from "./loggers";

import type { IStore } from "../types";
import type { TStatusHandler } from "../../shared/types";

interface IHandlersOptions {
  store: IStore;
}

interface IHandlers {
  appExitHandler: () => void;
  statusHandler: TStatusHandler;
}

export const handlersFactory = ({ store }: IHandlersOptions): IHandlers => {
  const appExitHandler = () => {
    logger.info("Server was stopped. Server statistic: ", {
      statistic: store.getStatistic(),
    });
  };

  const statusHandler: TStatusHandler = ({ metric, status }) => {
    if (status === 200) {
      logger.info("Message received:", metric);
      store.push(metric);
    }
  };

  return { appExitHandler, statusHandler };
};
