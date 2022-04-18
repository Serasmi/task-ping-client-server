import { errorRoute } from "./errorRoute";
import { qos } from "../utils/qos";
import { collectRequestData } from "../utils/common";
import { mapHTTPError } from "../../shared/constants";
import { qosConfig } from "../config";

import type { IncomingMessage, ServerResponse } from "http";
import type { IMetricMessage, TStatusHandler } from "../../shared/types";

interface IDataRouteOptions {
  statusHandler: TStatusHandler;
}

type TDataRouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  options: IDataRouteOptions
) => void;

const routePost: TDataRouteHandler = async (req, res, { statusHandler }) => {
  const metric = await collectRequestData<IMetricMessage>(req);
  const { status } = qos(qosConfig);

  statusHandler({ metric, status });

  switch (status) {
    case 200:
    case 500:
      res.writeHead(status);
      res.end(mapHTTPError[status]);
      break;
    default:
    // do not respond for other cases
  }
};

export const dataRoute: TDataRouteHandler = (req, res, options) => {
  switch (req.method) {
    case "POST":
      routePost(req, res, options);
      break;
    default:
      errorRoute(req, res);
  }
};
