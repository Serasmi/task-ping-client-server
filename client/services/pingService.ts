import https from "https";

import { normalizePath } from "./utils";
import { logger } from "../utils/loggers";
import { checkedServer } from "../config";

interface IPingService {
  get(path: string): Promise<void>;
  getMainPage(): Promise<void>;
}

const pingServiceFactory = (): IPingService => {
  const get: IPingService["get"] = (path) => {
    const normalizedPath = normalizePath(path);
    const fullPath = checkedServer.url + normalizedPath;

    logger.debug(`[ping service] Get page ${fullPath}`);

    return new Promise<void>((resolve, reject) => {
      https
        .get(fullPath, (res) => {
          res.on("end", () => {
            resolve();
          });

          res.on("data", () => {});
        })
        .on("error", (e) => {
          reject(e);
        });
    });
  };

  const getMainPage: IPingService["getMainPage"] = () => {
    return get("/");
  };

  return { get, getMainPage };
};

export default pingServiceFactory();
