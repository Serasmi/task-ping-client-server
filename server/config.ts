import type { IQoSConfig } from "./types";

export const serverConfig = {
  hostname: "localhost",
  port: 8080,
};

export const qosConfig: IQoSConfig = { 200: 0.6, 500: 0.2 };
