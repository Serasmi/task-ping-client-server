import type { IncomingMessage } from "http";

export const collectRequestData = async <T extends unknown>(
  req: IncomingMessage
): Promise<T> => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  let result = {};

  try {
    result = JSON.parse(data);
  } catch (e) {}

  return result as T;
};
