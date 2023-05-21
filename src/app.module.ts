import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeesService } from './coffees/coffees.service';

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

/* <-- `@Global()` Decorator would go here */
@Module({
  imports: [CoffeesModule],
  controllers: [
    AppController,
  ] /* <-- instantiate consumer/router of service classes encapsulated by this module */,
  providers: [
    AppService,
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
