import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, } from '@nestjs/common';

import { REQUEST_ID_TOKEN_HEADER } from '../constants';
import { AppLogger } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  constructor(private appLogger: AppLogger) { }

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const requestID = request.headers[REQUEST_ID_TOKEN_HEADER];

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorMessage = exception.getResponse() as HttpException;

      const responseObject = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        url: request.url,
        query: request.query,
        params: request.params,
        payload: request.body,
        error: errorMessage
      }

      this.appLogger.warn({ status, requestID, responseObject });
      return response.status(status).json(responseObject);
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const responseObject = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      url: request.url,
      query: request.query,
      params: request.params,
      payload: request.body,
      error: null,
      message: null
    }

    // Log the stack for non-HttpException errors
    if (exception instanceof Error) {
      responseObject.error = exception.name;
      responseObject.message = exception.message;
    } else {
      responseObject.error = 'INTERNAL SERVER';
    }

    this.appLogger.error({ status, requestID, responseObject }, exception.stack);
    return response.status(status).json(responseObject);
  }
}
