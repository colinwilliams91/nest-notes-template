import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees') // <-- Service Injection occurs in Constructor
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  /* NOTE:  `private` "access modifier - TypeScript shorthand, declares and initializes service and makes exclusive to class */
  /* NOTE:  `readonly` best practice - explicitly states we will only use, not modify here */
  /* NOTE: typing parameter (`: CoffeeService`) resolves dependency/service creates and returns Instance to our Controller
   * || returns the existing instance if it has been requested already elsewhere */

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  // @Get('query')
  // findAllQuery(@Query() paginationQuery) {
  //   const { limit, offset } = paginationQuery;
  //   return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  // }

  // @Get('express')
  // findAllExpress(@Res() response) {
  //   response
  //     .status(200)
  //     .send('This action returns via express exposed response library methods');
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  // @Put() // <-- replaces entire object, need whole object in payload

  @Patch(':id') // <-- replaces property of object
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
    // return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coffeesService.remove(id);
    // return `This action removes #${id} coffee`;
  }
}
