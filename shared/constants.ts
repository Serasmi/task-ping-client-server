import type { TMetricStatus } from "./types";

export type TMapHTTPError = {
  [key in TMetricStatus]: string;
};

export const mapHTTPError: TMapHTTPError = {
  200: "OK",
  500: "Internal Server Error",
  503: "Service Unavailable",
};

export const processStopSignals = ["SIGHUP", "SIGINT", "SIGQUIT"];
