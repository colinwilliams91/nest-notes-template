// Creating a TypeOrm Migration
// `npx typeorm migration:create src/migrations/CoffeeRefactor`
// CoffeeRefactor being the NAME we are giving "this" migration

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1684705321783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
    );
  }
}

/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs compilated files.
 */

// Compile project first
// `npm run build`

// Run migration(s)
// `npx typeorm migration:run -d dist/typeorm-cli.config`

// REVERT migration(s)
// `npx typeorm migration:revert -d dist/typeorm-cli.config`

// Let TypeOrm generate migrations (for you)
// `npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config`
