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

  // @Column('json', { nullable: true }) // <-- stores column data as `json` && makes optional
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees)
  flavors: string[];
}
