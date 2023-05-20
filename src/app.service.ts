import { Injectable } from '@nestjs/common'; /* <-- `@Injectable` Decorator attaches metadata declaring class's purpose */

/*
 * Services to provide methods throughout application.
 * Providers are defined as `@Injectable` Classes that will
 * carry and help assign methods to where they are needed
 *
 * CLI: `nest g service [name]`
 *
 */

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
