import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators'; // **

/**
 * (Binds extra logic *before* and *after* method execution)
 * (Transforms returned result from a method)
 * (CAN completely override a method)
 */

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');

    return next.handle().pipe(map((data) => ({ data }))); // <-- Wraps ALL payloads with `data: {}` object ***
    // return next.handle().pipe(tap((data) => console.log('After...', data))); // <-- shows response from endpoint
    // return next.handle(); // <-- executes Route Handler method
  }
}

/**
 * `intercept()` method must take Context and CallHandler (callback) AND return an Observable
 * `Observable` is an asynchronous alternative to Promises and Callbacks from `rxjs` (reactive library)
 *
 * This implementation effectively "wraps the Request/Response stream" allowing us to implement
 * custom logic *before* and *after* the execution of the final route handler
 *
 * ** `tap` operator invokes anonymous logging fn upon graceful termination of the Observable stream
 * without interfering with Response cycle.
 * `data` argument is the Response sent back from the route handler! (whatever comes back from our endpoint...)
 *
 * *** ALL payloads due to Global implementation in `main.ts` --> `app.useGlobalInterceptors(new WrapResponseInterceptor());`
 */
