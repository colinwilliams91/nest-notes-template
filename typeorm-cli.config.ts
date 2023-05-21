import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { CoffeeRefactor1684705321783 } from 'src/migrations/1684705321783-CoffeeRefactor';
import { SchemaSync1684706526494 } from 'src/migrations/1684706526494-SchemaSync';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost', // <-- switch for PROUCTION? (ENV)
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1684705321783, SchemaSync1684706526494],
});
