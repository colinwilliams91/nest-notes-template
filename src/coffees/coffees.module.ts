import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // <-- registers Type Orm in this module, array of Entities to be registered
  controllers: [CoffeesController],
  providers: [CoffeesService], // <-- Registers Provider with Nest IoC(Inversion of Control) Container)
}) // ...think of Providers as Module's API
export class CoffeesModule {}
