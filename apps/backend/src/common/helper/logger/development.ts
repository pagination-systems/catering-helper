import { createLogger, format, transports } from "winston";
import { env } from "../../../.config/env";

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const developmentLogger = createLogger({
  level: env.LOG_LEVEL,
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});
export default developmentLogger;
