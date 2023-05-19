import { Injectable } from '@nestjs/common';

/* a basic service with a single method */

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
