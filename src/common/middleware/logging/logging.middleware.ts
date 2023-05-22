import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * Middleware (class or function based (function has to be stateless)) must ALWAYS call `next()` or be left hanging
 * in Nest we bing middleware to a "route path" represented as a String (see `common.module.ts` for registering)
 *
 * This example Class will track round trip time for each http-request (we registered to '*' routes in `common-module.ts`)
 */

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log('Hi from middleware!');
    console.time('Request-response time');
    res.on('finish', () => console.timeEnd('Request-response time')); // <-- hooking into Express `response` 'finish' event
    next();
  }
}
