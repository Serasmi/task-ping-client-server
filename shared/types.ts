export interface IMetricMessage {
  pingId: number;
  deliveryAttempt: number;
  date: number;
  responseTime: number;
}

export type TMetricStatus = 200 | 500 | 503;

export interface IReportMetricStatus {
  metric: IMetricMessage;
  status: TMetricStatus;
}

export type TStatusHandler = ({ metric }: IReportMetricStatus) => void;
