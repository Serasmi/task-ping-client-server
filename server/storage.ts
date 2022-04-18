import { calcAverage, calcMedian } from "./utils/calc";

import type { IStore } from "./types";

export const storageFactory = (): IStore => {
  const _store: number[] = [];

  const getValue: IStore["getValue"] = () => {
    return [..._store];
  };

  const push: IStore["push"] = (msg) => {
    _store.push(msg.responseTime);
  };

  const getAvgPing: IStore["getAvgPing"] = () => {
    return calcAverage(_store);
  };

  const getMedianPing: IStore["getMedianPing"] = () => {
    return calcMedian(_store);
  };

  const getStatistic: IStore["getStatistic"] = () => {
    console.log(
      JSON.stringify({
        average: undefined,
        median: getMedianPing(),
      })
    );

    return {
      metricCount: _store.length,
      responseTime: {
        average: getAvgPing(),
        median: getMedianPing(),
      },
    };
  };

  return { getValue, push, getAvgPing, getMedianPing, getStatistic };
};
