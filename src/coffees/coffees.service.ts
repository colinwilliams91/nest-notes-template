import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

/* `this.coffees` is placeholder for DB Table  */

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) // <-- Injects automatically generated Repository that sits on top of our Table
    private readonly coffeeRepository: Repository<Coffee>, // <-- This exposes TypeORM methods to interact w/ data stores
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: string) {
    const coffee = this.coffeeRepository.findOne({ where: { id: +id } });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND); /* <-- above equivalent */
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // `preload()` === findOrCreate && will "patch" object (will return `undefined` if "id" not found in query)
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    // <-- need to check for `undefined` for `preload()` and throw error
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id); // <-- no throw error code because `findOne()` method we made handles that
    return this.coffeeRepository.remove(coffee);
  }
}
