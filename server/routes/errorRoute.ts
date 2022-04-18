import type { RequestListener } from "http";

export const errorRoute: RequestListener = (req, res) => {
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Resource not found" }));
};
