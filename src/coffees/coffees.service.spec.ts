import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from './coffees.module';
import { DatabaseModule } from '../database/database.module';
import { NotFoundException } from '@nestjs/common';

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

/* below: generic fn to return mocked obj w/ all methods that repository class provides*/
/* note: default type aliasing: `<T = any>` */
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;
  /* "setup phase" beforeEach() hook */
  beforeEach(async () => {
    /* instantiate test module to get a hold of our CoffeeService (Provider) */
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule, ConfigModule, CoffeesModule],
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();
    /* the above test Module and methods are now available to all tests in this `describe` block */

    service = module.get<CoffeesService>(CoffeesService); // **
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    // below: test for the success path
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    }); // below: test for the failure path
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        coffeeRepository.findOne.mockReturnValue(undefined);
        /* use `try/catch` to capture exceptions that *will* occur here (failure test path) */
        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy(); // we should never hit this line
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
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
