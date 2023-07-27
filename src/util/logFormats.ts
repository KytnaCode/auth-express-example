import {format} from 'winston'; // imports logging library

export const defaultFormat = format.combine(
  format.prettyPrint({ colorize: true }),
  format.timestamp(),
  format.label({ label: 'App'}),
  format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  }),
);
