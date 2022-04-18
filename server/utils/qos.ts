import { logger } from "./loggers";

import type { IQoSConfig } from "../types";
import type { IReportMetricStatus } from "../../shared/types";

export const qos = (
  config: IQoSConfig
): Pick<IReportMetricStatus, "status"> => {
  const rand = Math.random();

  logger.debug("[qos] ", { rand, 200: config["200"], 500: config["500"] });

  if (rand < config["200"]) {
    return { status: 200 };
  }

  if (rand < config["200"] + config["500"]) {
    return { status: 500 };
  }

  return { status: 503 };
};
