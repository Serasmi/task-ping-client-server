import http from "http";

import TimeoutError from "../errors/TimeoutError";
import { reportServer } from "../config";

import type { IMetricMessage } from "../../shared/types";
import ReportServerError from "../errors/ReportServerError";

interface IReportService {
  sendMetric(metric: IMetricMessage): Promise<unknown>;
}

const commonReqOptions = {
  hostname: reportServer.hostname,
  port: reportServer.port,
  headers: {
    "Content-Type": "application/json",
  },
};

const reportServiceFactory = (): IReportService => {
  const sendMetric: IReportService["sendMetric"] = (metric) => {
    const options = {
      ...commonReqOptions,
      path: "/data",
      method: "POST",
    };

    let requestTimer: NodeJS.Timer;

    return new Promise<void>((resolve, reject) => {
      requestTimer = setTimeout(() => {
        reject(new TimeoutError());
      }, reportServer.timeout);

      const req = http.request(options, (res) => {
        res.on("data", () => {});

        res.on("end", () => {
          clearTimeout(requestTimer);

          if (res.statusCode !== 200) {
            reject();
            return;
          }

          resolve();
        });
      });

      req.on("error", (e) => {
        clearTimeout(requestTimer);
        throw new ReportServerError();
      });

      req.write(JSON.stringify(metric));
      req.end();
    });
  };

  return { sendMetric };
};

export default reportServiceFactory();
