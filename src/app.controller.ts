import {
  Controller,
  Render,
  Get,
  Post,
} from '@nestjs/common'; /* <-- import injectable decorators */
import { AppService } from './app.service';

/* import { Request, Response } from 'express'; */ /* <-- import express methods to access ** see below */

/* [Controllers](https://docs.nestjs.com/controllers)
 * a basic controller with a single route
 * responsible for handling incoming requests and returning resposnes to the client
 *
 * CLI: `nest g controller [name]` to generate controller...
 * CLI: `nest g resource [name]` to generate controller w/ built in validation
 *
 * Controller Decorator required to define controller, associates class w/ required metadata
 * to enable Nest to create routing map (routing map ties requests to corresponding controllers)
 *
 * if we pass 'cats' as arg to `Controller('cats')` <-- specifies optional "path prefix"
 * no longer need to specify that portion of path for each route in this file: route `/cats`
 */

/* <-- Routes to DB in Controller ?? --> */

@Controller() /* <-- Decorator for AppController Class, optional path PREFIX param */
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(): string {
    return 'this action adds a new element';
  }

  @Get() /* <-- GET HTTP method decorator, optional PATH param will be concat with PREFIX param (defaults '/') */
  @Render('index') /* <-- main.ts for `views/index.html` entry declaration */
  root() {
    return { message: 'Root Render' };
    // return this.appService.getHello(); /* <-- equivalent to res.status(200).send(getHello(): string) (built-in) */
  }
}

/*
 * `constructor(private readonly appService: AppService)` <-- connects `getHello()` app.service method
 * `getHello(@Res() response)` <-- inject `@Res()` Decorator inside method handler signature
 * to expose Express Library `res` object | SAME thing can be done with `@Req()` decorator...
 */

/*
 * ** HTTP req | res DECORATORS API
 * **
 * @Req()**                | req
 * @Res()**                | res
 * @Next()                 | next
 * @Session()              | req.session
 * @Param(key?: string)    | req.params / req.params[key]
 * @Body(key?: string)     | req.body / req.body[key]
 * @Query(key?: string)    | req.query / req.query[key]
 * @Headers(name?: string) | req.headers / req.headers[name]
 * @Ip()                   | req.ip
 * @HostParam()            | req.hosts
 *
 * @Redirect()             | res.redirect()
 * Ex:
 * @Get()
 * @Redirect('https://nestjs.com', 301)
 * for dynamic redirect return object with this shape in route handler method (ex: `getHello()` above):
 * {
 * "url": arg, (string)
 * "statusCode": arg (number)
 * }
 */

/* ** EXPOSING req | res */
/*
 * Note that when you inject either @Res() or @Response() in a method handler,
 * you put Nest into Library-specific mode **for that handler**, and you become responsible
 * for managing the response. When doing so, you must issue some kind of response by making
 * a call on the response object (e.g., res.json(...) or res.send(...)), or the HTTP server will hang.
 */

/*
 * ROUTE PARAMETERS:
 * HINT: Routes with parameters should be declared after any static paths.
 * This prevents the parameterized paths from intercepting traffic destined for the static paths.
 * HINT: Import Param from the @nestjs/common package.
 *
 * Ex:
 * @Get(':id')
 * findOne(@Param() params: any): string {
 *   console.log(params.id);
 *   return `This action returns a #${params.id} cat`;
 * }
 *
 */
