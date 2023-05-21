import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])], // <-- registers Type Orm in this module, array of Entities to be registered
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
