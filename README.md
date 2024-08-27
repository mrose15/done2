# Project Architecture

## API directory
API uses:
- [Nest](https://nestjs.com/) with [TypeORM](https://docs.nestjs.com/techniques/database#typeorm-integration) integration for the API layer.
- [PostgreSQL](https://www.postgresql.org/) database.


### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Front-end directory
Front-end uses:
- Uses [React] (https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [ChakraUI](https://v2.chakra-ui.com/)
- [React Router](https://reactrouter.com/en/main)

### Installation

```bash
$ npm install
```

### Running the app
```bash
# watch mode
$ npm run dev

# production mode
$ npm run build
```