import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeesService } from './coffees/coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import * as Joi from '@hapi/joi';
import { APP_PIPE } from '@nestjs/core';

/*
 * the @Module Decorator provides metadata responsible for organizing application structure

 * the root module of the application
 * every Nest application's root module is used to build the "application graph"
 * which is the internal data structure Nest uses to resolve module and provider relationships & dependencies
 *
 * CLI: `nest g module [name]`
 *
 * each module should have its own dedicated directory
 * each module will take a single object argument whose properties describe the module:
 * --
 * IMPORTS: the list of imported modules that export the providers which are required in this module
 * PROVIDERS: the providers/services that will be instantiated by the Nest injector and that may be shared
 * at least across this module (Services that need to be intantiated for the Nest Injector)
 * CONTROLLERS: the set of controllers defined in this module which have to be instantiated
 * EXPORTS: the subset of providers that are provided by this module and should be available in other modules which import
 * this module. You can use either the provider itself or just its token ( provide value )
 *
 * When you want to provide a set of providers which should be available everywhere out-of-the-box
 * (e.g., helpers, database connections, etc.), make the module global with the @Global() decorator.
 * `import { Module, Global } from '@nestjs/common';` If we use `@Global()` module should only be registered
import { CoffeesController } from './coffees/coffees.controller';
 * once, and modules that wish to inject services from it would not need to register in their `imports []`
 *
 * for [Dynamic Modules](https://docs.nestjs.com/fundamentals/dynamic-modules)
 */

/* For more on Custom Configuration files (grouping configs by business domain), Configuration Namespaces
 * Partial Registration (modular and composable configs) and Asyncronously Configuring Dynamic Modules...
 * see [DOCS](https://docs.nestjs.com/techniques/configuration#custom-configuration-files)
 */

/* ** SEE BELOW FOR TYPEORM-MODULE IMPORT THAT DOESN'T NEED TO BE ASYNCHRONOUS ** */

/* <-- `@Global()` Decorator would go here */
@Module({
  imports: [
    // ConfigModule.forRoot({ // <-- to register global config if specified
    //   load: [appConfig],
    // }),
    CoffeesModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(), // <-- best practice configuration schema validations
        DATABASE_PORT: Joi.number().default(5432), // <-- best practice configuration schema validations (defaults 5432 if not provided)
      }),
    }), // <-- `{ ignoreEnvFile: true }` to ignore .env (ex: for heroku production)
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST, // <-- switch for PROUCTION? (ENV)
        port: +process.env.DATABASE_PORT, // <-- port set in `docker-compose.yml` (`+` coerces to number)
        username: process.env.DATABASE_USER, // <-- default (not currently set in `docker-compose.yml`)
        password: process.env.DATABASE_PASSWORD, // <-- `docker-compose.yml`
        database: process.env.DATABASE_NAME, // <-- initializes db & db name
        autoLoadEntities: true, // <-- loads Modules automatically without `entities` array
        synchronize: true, // <-- syncs typeorm entities w/ databases on every application run (DISABLE for PRODUCTION)
        // `synchronize` generates a SQL Table for all classes that contain `@Entity()` Decorator (and metadata they contain)
        // `useFactory: () => ({...})` property acts as Asynchronous provider injector (inject dependencies async)
      }),
    }),
    CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [
    AppController,
  ] /* <-- instantiate consumer/router of service classes encapsulated by this module */,
  providers: [
    AppService,
    // {
    //   provide: APP_PIPE, // <-- this provider object Instantiates `ValidationPipe` inside module and registers as Global Pipe
    //   useClass: ValidationPipe, // <-- this is best practice because NOW we can inject dependencies since inside Module
    // },
  ] /* <-- register Provider(service) so Nest can inject dependencies from Class for Consumers (ex: `app.controller.ts`) */,
})
export class AppModule {}

/* `cats.module.ts`
 * ex: export service
 *
 * @Module({
 *   controllers: [CatsController],
 *   providers: [CatsService],
 *   exports: [CatsService]
 * })
 *export class CatsModule {}
 *
 * now any module that imports the CatsModule has access to the CatsService and will
 * share the same instance with all other modules that import it as well.
 *
 * --
 * --
 * --
 *
 * `core.module.ts`
 * ex: import & re-export making 3rd party module available for other modules that import this one
 *
 * @Module({
 *   imports: [CommonModule],
 *   exports: [CommonModule],
 * })
 * export class CoreModule {}
 *
 */

/**
 * pass to import: [] inside @Module signature when no need for Asynchronous importing (nothing requiring it before in array)
 *  TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST, // <-- switch for PROUCTION? (ENV)
      port: +process.env.DATABASE_PORT, // <-- port set in `docker-compose.yml` (`+` coerces to number)
      username: process.env.DATABASE_USER, // <-- default (not currently set in `docker-compose.yml`)
      password: process.env.DATABASE_PASSWORD, // <-- `docker-compose.yml`
      database: process.env.DATABASE_NAME, // <-- initializes db & db name
      autoLoadEntities: true, // <-- loads Modules automatically without `entities` array
      synchronize: true, // <-- syncs typeorm entities w/ databases on every application run (DISABLE for PRODUCTION)
      // `synchronize` generates a SQL Table for all classes that contain `@Entity()` Decorator (and metadata they contain)
    }),
 *
 * */
