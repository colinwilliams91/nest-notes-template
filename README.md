<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## -- [SOLID](https://en.wikipedia.org/wiki/SOLID) -- Nest's Object Oriented Organizational Methodology

- S - Single-Responsibility Principle - "Every class should have only one responsibility."

- O - Open-Closed Principle - "Software Entities are open for extension, but closed for modification."

- L - Liskov Substitution Principle - "Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it."
- I - Interface Segregation Principle - "Clients should not be forced to depend upon interfaces that they do not use."
- D - Dependency Inversion Principle - "Depend upon abstractions, not concretions."

# Developer Notes:

_Ex:_ _To implement new entity/resource with exposed CRUD endpoints_

- Generate a module (`nest g mo`) to keep code organized and establish clear boundaries (grouping related components)
- Generate a controller (`nest g co`) to define CRUD routes (or queries/mutations for GraphQL applications)
- Generate a service (`nest g s`) to implement & isolate business logic
- Generate an entity class/interface to represent the resource data shape
- Generate Data Transfer Objects (or inputs for GraphQL applications) to define how the data will be sent over the network

### OR

- To create a new resource, simply run the following command in the root directory of your project:
- `nest g resource`
- Above command not only generates all the NestJS building blocks (module, service, controller classes) but also an entity class, DTO classes as well as the testing (.spec) files.

[Nest CLI resource generation docs:](https://docs.nestjs.com/recipes/crud-generator#crud-generator)

_Ex:_ _Controller response object exposure_

Nest detects when the handler is using either @Res() (<-- injectable decorators -->) or @Next(), indicating you have chosen the library-specific option. If both approaches are used at the same time, the Standard approach is automatically disabled for this single route and will no longer work as expected. To use both approaches at the same time (for example, by injecting the response object to only set cookies/headers but still leave the rest to the framework), you must set the passthrough option to true in the @Res({ passthrough: true }) decorator.

_Ex:_ _Docker YAML and start-up_

```js
/* YAML docker-compose.yml configuration file */
version: "3"
services:
  db:
    image:  postgres // image to create db
    restart: always
    ports: // `port:port` allows access inside and outside docker
      - "5432:5432"
    environment:
       POSTGRES_PASSWORD: pass123

// Start containers in detached / background mode
docker-compose up -d
// `docker-compose up [db] -d // <-- to start specific `service`
// ...if no services specified, will start all `services` in YAML

// Stop containers
docker-compose down
```

# Contribution

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Database

## This codebase has a SQL (PostgreSQL & TypeORM) branch && a NoSQL (MongoDB & Mongoose)

## _SQL_

- _DEPENDENCIES_: @nestjs/typeorm typeorm pg
- _RUN_: `$ docker exec -tiu postgres secret-stories-db-1 psql` <-- for psql shell
- `docker exec`: <-- runs a command inside a Docker container
- `-t`: <-- allows interaction with CLI of container
- `-i`: <-- (`--interactive`) keeps the STDIN (standard input) open, even if not attached, allows us to provide input to the container's command
- `-u`: <-- specifies user/username context, ensures command `psql` is run as [username]
- `postgres`: <-- provided [username] to match PostgreSQL connection (TypeOrmModule.forRoot({...}))
- `secret-stories-db-1`: <-- docker container name, found in `$ docker-compose up -d` terminal
- `psql`: <-- [command] to execute

### _COMMANDS_

- `postgres=# \du`: <-- shows user information
- `postgres=# \l`: <-- shows databases
- `postgres=# \c [database]`: <-- connect to && use db
- `postgres=# \dt`: <-- list tables from current schema
- `postgres=# \d [table]`: <-- show table definition

[MORE PSQL CLI COMMANDS](https://postgrescheatsheet.com/#/tables)

## _NoSQL_:

## License

Nest is [MIT licensed](LICENSE).
