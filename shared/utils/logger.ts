import { undefinedJsonReplacer } from "./common";

export type TLogType = "debug" | "info" | "error";

type ILogOptions = Record<string, any>;

type TLoggerHandler = (msg: string, options?: ILogOptions) => void;

export interface ILoggerFactoryOptions {
  prefix: string;
}

export interface ILogger {
  debug: TLoggerHandler;
  error: TLoggerHandler;
  info: TLoggerHandler;
}

export const loggerFactory = ({
  prefix = "",
}: ILoggerFactoryOptions): ILogger => {
  const _log = (type: TLogType, msg: string, options?: ILogOptions) => {
    let message = `${new Date().toISOString()} ${type.toUpperCase()}`;

    if (prefix.length) {
      message += ` [${prefix}]`;
    }

    message += ` ${msg}`;

    if (options) {
      try {
        message += ` ${JSON.stringify(options, undefinedJsonReplacer)}`;
      } catch (e) {}
    }

    console.log(message);
  };

  const debug: TLoggerHandler = (msg, options) => {
    if (process.env.DEBUG) _log("debug", msg, options);
  };

  const error: TLoggerHandler = (msg, options) => {
    _log("error", msg, options);
  };

  const info: TLoggerHandler = (msg: string, options) => {
    _log("info", msg, options);
  };

  return { debug, error, info };
};
