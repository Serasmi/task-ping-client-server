import reportService from "./services/reportService";
import { delay } from "./utils/common";
import { retryOptions } from "./config";

import TimeoutError from "./errors/TimeoutError";

import type { IMetricMessage, IReportMetricStatus } from "../shared/types";
import { logger } from "./utils/loggers";

interface IMetricMessageDraft extends Omit<IMetricMessage, "deliveryAttempt"> {}

export interface IStatusHandlerOptions extends IReportMetricStatus {}

interface IMetricReporterFactoryOptions {
  statusHandler: (options: IStatusHandlerOptions) => void;
}

interface IMetricReporter {
  send: (metricDraft: IMetricMessageDraft) => Promise<IReportMetricStatus>;
}

const { maxAttempts, growFactor } = retryOptions;

export const metricReporterFactory = ({
  statusHandler,
}: IMetricReporterFactoryOptions): IMetricReporter => {
  const sendMetricWithRetry = async (
    metricDraft: IMetricMessageDraft,
    attempts = 0
  ): Promise<IReportMetricStatus> => {
    const deliveryAttempt = attempts + 1;
    const metric: IMetricMessage = {
      ...metricDraft,
      deliveryAttempt,
    };

    try {
      logger.info("Sending metric to server...", metric);

      await reportService.sendMetric(metric);

      const reportResult: IReportMetricStatus = { status: 200, metric };
      statusHandler(reportResult);

      return reportResult;
    } catch (e) {
      if (e instanceof TimeoutError) {
        statusHandler({ status: 503, metric });
      } else {
        statusHandler({ status: 500, metric });
      }

      if (deliveryAttempt >= maxAttempts) {
        return { status: 500, metric };
      }

      const jitter = Math.random() * 5;

      await delay(2 ** attempts * growFactor + jitter);

      return sendMetricWithRetry(metricDraft, deliveryAttempt);
    }
  };

  const send: IMetricReporter["send"] = async (metricDraft) => {
    return await sendMetricWithRetry(metricDraft);
  };

  return { send };
};
