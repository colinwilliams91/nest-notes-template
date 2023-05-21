import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // <-- SQL Table === coffee now from typeorm, `@Entities('name')` for different Table name
export class Coffee {
  @PrimaryGeneratedColumn() // <-- makes Primary Key and auto-increments
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true }) // <-- stores column data as `json` && makes optional
  flavors: string[];
}
