import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*
 * a basic controller with a single route
 * responsible for handling incoming requests and returning resposnes to the client
 *
 * CLI: `nest g controller [name]` to generate controller...
 * CLI: `nest g resource [name]` to generate controller w/ built in validation
 *
 * Controller Decorator required to define controller associates class w/ required metadata
 * required to define controller associates class w/ required metadata to enable Nest to create routing map
 * (routing map ties requests to corresponding controllers)
 *
 * if we pass 'cats' as arg to `Controller('cats')` specifies optional "path prefix"
 * no longer need to specify that portion of path for each route in this file: route `/cats`
 */

@Controller() /* <-- Decorator for AppController Class, optional path prefix param */
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() /* <-- GET HTTP method decorator, optional path param will be concat with prefix param */
  getHello(): string {
    return this.appService.getHello(); /* <-- equivalent to res.status(200).send(getHello(): string) (built-in) */
  }
}

/*
 * `constructor(private readonly appService: AppService)` <-- connects `getHello()` app.service method
 * `getHello(@Res() response)` <-- inject @Res() Decorator inside method handler signature
 * to expose Express Library `res` object
 */
