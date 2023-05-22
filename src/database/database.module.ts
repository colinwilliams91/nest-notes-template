import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

// Generate a DatabaseModule
// `$ nest g mo database`

// Improved Dynamic Module way of creating CONNECTION provider
@Module({})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule, // <-- return type `DynamicModule` requires this property
      providers: [
        {
          provide: 'CONNECTION',
          useValue: new DataSource(options).initialize(),
        },
      ], // <-- Providers just like in `coffees.modules.ts` `providers: [CoffeesService]` || [{ provide: CoffeesService, useValue: CoffeesService }]
    };
  }
}

/* ... this will be the shape of the `options` argument for `DatabaseModule.register({...})` ... */
// { // 👈 passing in dynamic values
//   type: 'postgres',  // <-- could also be dynamic
//   host: 'localhost', // <-- could also be dynamic
//   // 👇👇👇👇 Make sure these are included 👇👇👇
//   // 👇👇👇👇 Make sure these are included 👇👇👇
//   // 👇👇👇👇 Make sure these are included 👇👇👇
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
// }
