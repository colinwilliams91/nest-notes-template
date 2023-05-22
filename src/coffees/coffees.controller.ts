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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

// @UsePipes() <-- pass single Pipe Class, comma separated list of Pipe Classes,
// or `new ValidationPipe({...}) for specific scenario Pipes (inside features, etc)
// (best practice use Class instead of `new` Instantiations for memory useage and re-usability)
// can be used for Controller Classes OR Route Handlers/Methods!

@Controller('coffees') // <-- Service Injection occurs in Constructor
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {} // <-- requesting CoffeesService here (Nest Injection)
  /* NOTE:  `private` "access modifier - TypeScript shorthand, declares and initializes service and makes exclusive to class */
  /* NOTE:  `readonly` best practice - explicitly states we will only use, not modify here */
  /* NOTE: typing parameter (`: CoffeeService`) resolves dependency/service creates and returns Instance to our Controller
   * || returns the existing instance if it has been requested already elsewhere */

  // @UsePipes(ValidationPipe) example of specific route Pipe
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
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
  // @Body(ValidationPipe) <-- we can even pass Pipes as PARAM SCOPE (applying Pipe DTO Validation just to specific parameter)

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coffeesService.remove(id);
    // return `This action removes #${id} coffee`;
  }
}
