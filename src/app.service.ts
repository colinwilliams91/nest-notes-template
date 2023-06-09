import { Injectable } from '@nestjs/common'; /* <-- `@Injectable` Decorator attaches metadata declaring class's purpose */

/*
 * Services to provide methods throughout application.
 * -- Providers/Services handle business logic as well as interactions with data sources -- WHERE DB INTERACTIONS HAPPEN
 * Providers are defined as `@Injectable` Classes that will
 * carry and help assign methods to where they are needed
 *
 * we will access data within services files
 *
 * CLI: `nest g service [name]`
 *
 */

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Hello World!</h1>';
  }
}
