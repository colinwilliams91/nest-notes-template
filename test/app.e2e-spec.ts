// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest'; // <-- library for high-level abstraction (testing http)
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   /* since we are re-creating application, we don't want it to happen for each test (use beforeAll) */
//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule], // <-- this is not best practice, Modules should be tested in isolation
//     }).compile();

//     app = moduleFixture.createNestApplication(); // <-- instantiates actual Nest runtime environment
//     await app.init(); // <-- & above: simulated http requests for end-to-end replication
//     // above: mounts all of our routes, triggers lifecycle hooks, etc.
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer()) // <-- supertest accepts http listener Nest app runs on
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });

//   /* clean up: tell Nest to trigger `OnModuleDestroy` and `OnApplicationShutdown lifecycle hooks */
//   /* to terminate *all* connections in our application */
//   afterAll(async () => {
//     await app.close();
//   });
// });

// ** pass: `.set('Authorization', process.env.API_KEY)` // <-- sets custom Authorization header
// between `.get()` & `expect()` to make pass if ApiKeyGuard is wired up
