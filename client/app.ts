import { metricReporterFactory } from "./metricReporter";
import pingService from "./services/pingService";

import { measureAsyncDuration } from "./utils/common";
import { logger } from "./utils/loggers";

import type { IStore } from "./types";
import type { TStatusHandler } from "../shared/types";

interface IOptions {
  delay: number;
  statusHandler: TStatusHandler;
  store: IStore;
}

export const startStatusLoop = ({
  delay,
  statusHandler,
}: IOptions): NodeJS.Timer => {
  let pingId = 0;

  const metricReporter = metricReporterFactory({ statusHandler });

  const loopIteration = async () => {
    logger.debug("Try to check server...");

    pingId++;

    const { date, duration } = await measureAsyncDuration(
      pingService.getMainPage
    );

    const { metric, status } = await metricReporter.send({
      date,
      responseTime: duration,
      pingId,
    });

    logger.debug(
      `Metric sending request was finished with status ${status}.`,
      metric
    );
  };

  loopIteration();

  return setInterval(loopIteration, delay);
};
