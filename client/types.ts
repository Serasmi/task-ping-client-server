import type { TMetricStatus } from "../shared/types";

export type TStoreValue = {
  [key in TMetricStatus]: number;
};

interface IStoreStatistic {
  requestsCount: number;
  success: number;
  serverError: number;
  serverUnavailable: number;
}

export interface IStore {
  getStatistic: () => IStoreStatistic;
  getValue: () => TStoreValue;
  push: (status: TMetricStatus) => void;
}
