/* eslint-disable implicit-arrow-linebreak */
import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'process.log');

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: path.basename(process.title) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.splat(),
    format.simple(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
        ),
      ),
    }),
    new transports.File({
      filename,
      maxsize: 5242880,
      maxFiles: 5,
      format: format.combine(
        format.printf(
          (info) =>
            `${info.timestamp} [${info.label}] ${info.level}: ${JSON.stringify(
              info.message,
            )}`,
        ),
      ),
    }),
  ],
});

export default logger;
