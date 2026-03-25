import pino from "pino";

// Structured logger using pino
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: {
    app: "eco-monitoring",
    env: process.env.NODE_ENV || "development",
  },
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;

// Typed log helpers for specific use cases
export const logInfo = (message: string, context?: Record<string, unknown>) =>
  logger.info(context ?? {}, message);

export const logWarn = (message: string, context?: Record<string, unknown>) =>
  logger.warn(context ?? {}, message);

export const logError = (
  message: string,
  error?: Error | unknown,
  context?: Record<string, unknown>
) =>
  logger.error(
    {
      ...(context ?? {}),
      err:
        error instanceof Error
          ? { message: error.message, stack: error.stack, name: error.name }
          : error,
    },
    message
  );

export const logDebug = (message: string, context?: Record<string, unknown>) =>
  logger.debug(context ?? {}, message);
