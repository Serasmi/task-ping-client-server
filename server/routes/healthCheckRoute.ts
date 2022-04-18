import type { RequestListener } from "http";

export const healthCheckRoute: RequestListener = (req, res) => {
  res.writeHead(200);
  res.end("API is working!");
};
