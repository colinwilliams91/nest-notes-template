import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

/**
 * Set up COMMON Module to allow for global/common Guards, similar to `app.useGlobalGuards()`
 * however, we can pass dependencies into this one (needed for Reflector) unlike with `app.useGlobalGuards()`
 */

@Module({
  imports: [ConfigModule], // <-- allows for ConfigService use in our Guard
  // providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }], // <-- this implements ApiKeyGuard GLOBALLY **
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // <-- binds middleware argument to EVERY route (wildcard)
    // consumer.apply(LoggingMiddleware).forRoutes('coffees'); // <-- binds middleware argument to 'coffees' routes
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*'); // <-- binds middleware argument to '*', exludes 'coffees'
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'coffees', method: RequestMethod.GET }); // <-- only binds middleware argument to 'coffees' GET methods
  }
}

// ** For more pointed implementation: @UseGuards(ApiKeyGuard)` Decorator under @Controller('...') for ex.
// passing in the Class instead of an Instance (`new`) leaves instantiation to the framework and enables dependency injection
// this can also be used at the specific Method level or Global level (see `main.ts` for Global) or above Module `providers: []`
