# Services

Dashboardz services.

## Environment variables setup
  Create `.env` from `.env.example` and set below environment variables to connect to remote firebase firestore database

> PORT="3000"
> 
> ENVIRONMENT="local"
> 
> GOOGLE_APPLICATION_CREDENTIALS=""


## Installation

```bash
$ yarn install
```

## Running the app(Development)

```bash
$ yarn start:dev
```
 Navigate to `http://localhost:3000/`.
 
Swagger documentation `http://localhost:3000/api/docs`.

## Build app(Production)

```bash
$ yarn build
```
The build artifacts will be stored in the `dist/` directory.