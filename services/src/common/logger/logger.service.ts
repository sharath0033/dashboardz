import { LoggerService, Injectable, Scope } from '@nestjs/common';
import { createLogger, Logger, transports, format } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
// export class AppLogger extends Logger {}
export class AppLogger implements LoggerService {
  private winstonLogger: Logger;

  constructor() {
    this.winstonLogger = createLogger({
      level: 'info',
      format: format.combine(
        format(info => {
          info.level = info.level.toUpperCase()
          return info;
        })(),
        format.timestamp({
          format: "DD-MM-YYYY hh:mm:ss"
        }),
        format.colorize({
          all: true,
          colors: {
            info: 'dim white',
            error: 'red',
            warn: 'yellow',
            debug: 'blue',
            verbose: 'cyan'
          }
        }),
        format.printf(
          info => `[${info.timestamp}] [${info.level}] : ${info.message}`
        )
      ),
      transports: [new transports.Console()],
    })
  }

  log(message: any) {
    return this.winstonLogger.info(message);
  }

  error(message: any, trace?: string): any {
    return this.winstonLogger.error(message, { trace });
  }

  warn(message: any): any {
    return this.winstonLogger.warn(message);
  }

  debug(message: any): any {
    return this.winstonLogger.debug(message);
  }

  verbose(message: any): any {
    return this.winstonLogger.verbose(message);
  }
}