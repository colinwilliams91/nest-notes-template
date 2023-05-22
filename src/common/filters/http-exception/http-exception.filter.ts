import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * We set this Http Exception Filter in `common` directory to be re-used
 * anywhere that an Http request is being sent. It will validate and throw
 * exceptions/errors if Http requests are not following our constraints
 *
 * we will apply it to our `app` server in `main.ts` with `app.useGlobalFilters(new HttpExceptionFilter());`
 */

@Catch(HttpException) // <-- binds Exception Filter metadata, can take single param or list to apply up to several types of exceptions
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // <-- exposes access to native inflight Request or Response Objects
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
