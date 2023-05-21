import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

/* `this.coffees` is placeholder for DB Table  */

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) // <-- Injects automatically generated Repository that sits on top of our Table
    private readonly coffeeRepository: Repository<Coffee>, // <-- This exposes TypeORM methods to interact w/ data stores
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    return this.coffeeRepository.find({
      relations: {
        flavors: true, // <-- added for explicit relationship resolvement (leave `find()` call empty otherwise)
      },
    });
  }

  async findOne(id: string) {
    const coffee = this.coffeeRepository.findOne({
      where: { id: +id },
      relations: { flavors: true },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND); /* <-- above equivalent */
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors && // <-- inline conditional, just like react
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    // `preload()` === findOrCreate && will "patch" object (will return `undefined` if "id" not found in query)
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
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

  /* below: takes input flavor name and returns a Promise that resolves to real Flavor Entity  */
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    }); // 👈 notice the "where"
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
