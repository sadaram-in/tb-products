import pino from 'pino';
// windspan
// 1. try netlabs logger

// pnpm add @Netlabs-Australia-Pty-Ltd/napl-ts-logger

// npm install @Netlabs-Australia-Pty-Ltd/napl-ts-logger

const transport = pino.transport({
  target: 'pino/file',
  options: { destination: 'logs/app.log' },
});

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    base: undefined,
    messageKey: 'msg',
  },
  transport,
);

export const createLogger = (context: string) => {
  return {
    ...logger.child({ context }),
    info: (message: string, obj?: object) => {
      logger.info({ context, msg: message, ...obj });
    },
    error: (message: string, obj?: object) => {
      logger.error({ context, msg: message, ...obj });
    },
    warn: (message: string, obj?: object) => {
      logger.warn({ context, msg: message, ...obj });
    },
    debug: (message: string, obj?: object) => {
      logger.debug({ context, msg: message, ...obj });
    },
  };
};

export default logger;
