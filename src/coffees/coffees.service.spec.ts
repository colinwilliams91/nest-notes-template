import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from './coffees.module';
import { DatabaseModule } from '../database/database.module';

/**
 * other available test lifecycle options: beforeAll(), afterEach(), afterAll()
 * Test.createTestingModule({}) takes Module Metadata object as its argument
 * (the same object we pass into our Module Decorators)
 *
 * `.compile()` method bootstraps the module with its dependencies, similar to
 * the way we bootstrap our application in main.ts with `NestFactory.create()`
 * this will return a testing module instance, exposing methods, one of which
 * we use to retrieve any static instance declared within the module (`.get()`)
 *
 * TESTS SHOULDN'T DEPEND UPON EXTERNAL DEPENDENCIES (tests in reasonable isolation)
 */

// RUN: `npm run test:watch -- coffees.service`

describe('CoffeesService', () => {
  let service: CoffeesService;
  /* "setup phase" beforeEach() hook */
  beforeEach(async () => {
    /* instantiate test module to get a hold of our CoffeeService (Provider) */
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule, ConfigModule, CoffeesModule],
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} }, // 👈
        { provide: getRepositoryToken(Coffee), useValue: {} }, // 👈
      ],
    }).compile();
    /* the above test Module and methods are now available to all tests in this `describe` block */

    service = module.get<CoffeesService>(CoffeesService); // **
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

/**
 * This test provides an application execution context that essentially
 * mocks the full Nest runtime.
 *
 * We can use the test hooks to manage class instances, mock providers/consumers/services,
 * and override aspects of the application
 *
 * Our Module's Providers array needs connectivity to the DB. How do we fix that?***
 * `getRepositoryToken()` accepts an Entity and returns an Injection Token
 */

// ***
// Basic / empty "Mocks" for Entities in our CoffeesService
// providers: [
//   CoffeesService,
//   { provide: DataSource, useValue: {} },
//   { provide: getRepositoryToken(Flavor), useValue: {} }, // 👈
//   { provide: getRepositoryToken(Coffee), useValue: {} }, // 👈
// ]

// ** use `.resolve()` method instead of `get()` to retrieve Request or Transiet Scoped providers
