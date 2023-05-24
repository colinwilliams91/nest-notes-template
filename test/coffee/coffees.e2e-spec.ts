// import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
// import { TestingModule, Test } from '@nestjs/testing';
// import { CoffeesModule } from '../../src/coffees/coffees.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import * as request from 'supertest';
// import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto/create-coffee.dto';

// /* to run: `npm run test:e2e -- coffees` */

// describe('[Feature] Coffees - /coffees', () => {
//   const covfefe = {
//     name: 'Test Coffee',
//     brand: 'The GREATEST Coffee',
//     flavors: ['chocolate', 'vanilla'], // ** these are just strings, we will convert them to represent flavor entities below
//   };

//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         CoffeesModule,
//         TypeOrmModule.forRoot({
//           type: 'postgres',
//           host: 'localhost',
//           port: 5433,
//           username: 'postgres',
//           password: 'pass123',
//           database: 'postgres',
//           autoLoadEntities: true,
//           synchronize: true,
//         }),
//       ],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     app.useGlobalPipes(
//       new ValidationPipe({
//         transform: true,
//         whitelist: true,
//         forbidNonWhitelisted: true,
//         transformOptions: {
//           enableImplicitConversion: true,
//         },
//       }),
//     ); // <-- enforces validation rules for all incoming client Payloads automatically (body shapes)
//     await app.init();
//   });

//   it('Create [POST /]', () => {
//     return request(app.getHttpServer())
//       .post('/coffees')
//       .send(covfefe as CreateCoffeeDto)
//       .expect(HttpStatus.CREATED) // below: `jasmine` helpers for "partial matching"*
//       .then(({ body }) => {
//         const expectedCovfefe = jasmine.objectContaining({
//           ...covfefe,
//           flavors: jasmine.arrayContaining(
//             covfefe.flavors.map((name) => jasmine.objectContaining({ name })), // ** map string[] to object[] for flavor entities
//           ), // *"partial matching" useful when expectation only cares about certain key/value pairs for test
//         });
//         expect(body).toEqual(expectedCovfefe);
//       });
//   });
//   it.todo('Get all [GET /]');
//   it.todo('Get one [GET /:id]');
//   it.todo('Update one [PATCH /:id]');
//   it.todo('Delete one [DELETE /:id]');

//   afterAll(async () => {
//     await app.close();
//   });
// });

/**
 * Remaing `it.todo()` endpoint tests to implement:
 */

// it('Get all [GET /]', () => {
//   return request(httpServer)
//     .get('/coffees')
//     .then(({ body }) => {
//       console.log(body);
//       expect(body.length).toBeGreaterThan(0);
//       expect(body[0]).toEqual(expectedPartialCoffee);
//     });
// });
//
// it('Get one [GET /:id]', () => {
//   return request(httpServer)
//     .get('/coffees/1')
//     .then(({ body }) => {
//       expect(body).toEqual(expectedPartialCoffee);
//     });
// });
//
// it('Update one [PATCH /:id]', () => {
//   const updateCoffeeDto: UpdateCoffeeDto = {
//     ...coffee,
//     name: 'New and Improved Shipwreck Roast'
//   }
//   return request(httpServer)
//     .patch('/coffees/1')
//     .send(updateCoffeeDto)
//     .then(({ body }) => {
//       expect(body.name).toEqual(updateCoffeeDto.name);

//       return request(httpServer)
//         .get('/coffees/1')
//         .then(({ body }) => {
//           expect(body.name).toEqual(updateCoffeeDto.name);
//         });
//     });
// });

// it('Delete one [DELETE /:id]', () => {
//   return request(httpServer)
//     .delete('/coffees/1')
//     .expect(HttpStatus.OK)
//     .then(() => {
//       return request(httpServer)
//         .get('/coffees/1')
//         .expect(HttpStatus.NOT_FOUND);
//     })
// });
