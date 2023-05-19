import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*
 * a basic controller with a single route
 * responsible for handling incoming requests and returning resposnes to the client
 *
 * CLI: `nest g resource [name]` to generate CRUD generator w/ validation built in
 */

/*
 * Controller Decorator required to define controller | associates class w/ required metadata
 * required to define controller | associates class w/ required metadata to enable Nest to create routing map
 * (routing map ties requests to corresponding controllers)
 */

@Controller() /* <-- Decorator for AppController Class */
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
