import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity/event.entity';

import { COFFEE_BRANDS } from './coffees.constants';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

// by default, every provider is a "singleton", meaning it will instantiate once
// that is the default param for @Injectable, however, we can pass { scope: Scope.DEFAULT } to make this explicit,
// alternative options: { scope: Scope.TRANSIENT } --> Instantiated everywhere (each module/consumer) it is used
// { scope: Scope.REQUEST } --> Instantiated for each incoming request (ex: localhost/coffees http GET)
// Scope.REQUEST will bubble up REQUEST scope through the Inject Chain (controller will become REQUEST scoped too)
@Injectable()
export class CoffeeBrandsFactory {
  create() {
    /* ... do something ... */ // we can use `async/await` inline fn with `useFactory` provider/value where injected
    console.log('[!] Async Factory');
    return ['mojo', 'cannibal coffee'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // <-- registers Type Orm in this module, array of Entities to be registered
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    {
      provide: COFFEE_BRANDS,
      useFactory: async (brandsFactory: CoffeeBrandsFactory) =>
        await Promise.resolve(brandsFactory.create()), // <-- @Injectable Class method invocation passed to useFactory property inline use
      inject: [CoffeeBrandsFactory], // <-- `inject` takes in array of providers which get passed into `useFactory()`
    },
  ], // <-- Registers Provider with Nest IoC(Inversion of Control) Container)
  exports: [CoffeesService],
}) // ...think of Providers as Module's API
export class CoffeesModule {}
