import type { IStore, TStoreValue } from "./types";

export const storageFactory = (): IStore => {
  const _store: TStoreValue = {
    200: 0,
    500: 0,
    503: 0,
  };

  const getValue: IStore["getValue"] = () => {
    return { ..._store };
  };

  const push: IStore["push"] = (status) => {
    _store[status]++;
  };

  const getStatistic: IStore["getStatistic"] = () => {
    return {
      requestsCount: Object.values(_store).reduce((a, b) => a + b),
      success: _store["200"],
      serverError: _store["500"],
      serverUnavailable: _store["503"],
    };
  };

  return { getStatistic, getValue, push };
};
