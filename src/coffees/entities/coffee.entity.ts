import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // <-- SQL Table === coffee now from Typeorm, `@Entities('name')` for different Table name
export class Coffee {
  @PrimaryGeneratedColumn() // <-- makes Primary Key and auto-increments
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // @Column('json', { nullable: true }) // <-- stores column data as `json` && makes optional
  // `{ cascade: true }` <-- flavors that belong to a newly created Coffee will be automatically inserted into DB
  // GO TO: `dto/create-coffee.dto.ts` and map `flavors` strings to _real_ entities (instances of a Flavor Entity)
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true }) // <-- enable cascading for inserts and updates
  flavors: Flavor[];
}
