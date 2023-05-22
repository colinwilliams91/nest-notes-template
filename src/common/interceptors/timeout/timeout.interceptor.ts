import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

/**
 * Times out response if exceeds threshold (12000)
 * implemented Globally via `main.ts` `app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor());`
 * NOTE: binding multiple interceptors, NOTE: no dependencies needer so we pass (new) Instantiations
 */

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(12000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
