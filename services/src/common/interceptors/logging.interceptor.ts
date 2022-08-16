import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { REQUEST_ID_TOKEN_HEADER } from '../constants';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private appLogger: AppLogger) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.originalUrl;
    const requestID = request.headers[REQUEST_ID_TOKEN_HEADER];

    this.appLogger.log({ method, requestID, url });

    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        const responseTime = Date.now() - now;
        this.appLogger.log({ method, requestID, url, statusCode, responseTime });
      })
    )
  }
}
