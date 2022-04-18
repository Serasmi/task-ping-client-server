import type { IMetricMessage, IReportMetricStatus } from "../shared/types";

export interface IQoSConfig {
  200: number;
  500: number;
}

interface IStoreStatistic {
  metricCount: number;
  responseTime: {
    average: number | undefined;
    median: number | undefined;
  };
}

export interface IStore {
  getAvgPing: () => number | undefined;
  getMedianPing: () => number | undefined;
  getStatistic: () => IStoreStatistic;
  getValue: () => number[];
  push: (msg: IMetricMessage) => void;
}
