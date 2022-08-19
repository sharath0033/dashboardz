# Highlevel Dashboard Monorepo

## Tech Stack
- Frontend: Angular
- Services: NestJS
- Backend: Firebase Firestore
- Hosting: Docker
## Docker Build

Run `docker-compose up` to run the services as local docker containers.

## Manual Build

1. NestJS Services(Connect to Fireebase cloud)

    Change pwd to `/services` and follow the provided instructions in the `README.md`

2. Angular Webapp

    Change pwd to `/webapp` and follow the provided instructions in the `README.md`

## Service Urls

| Service            | URL                                                                | Manual Build |
| ------------------ | ------------------------------------------------------------------ | ------------ |
| Firebase Firestore | [http://localhost:4000/firestore](http://localhost:4000/firestore) | No           |
| NestJS Services    | [http://localhost:3000/api](http://localhost:4000/api)             | Yes          |
| NestJS Swagger     | [http://localhost:3000/api/docs](http://localhost:4000/api/docs)   | Yes          |
| Angular Webapp     | [http://localhost:4200](http://localhost:4200)                     | Yes          |


## Known issues

1. Sill working on Bar and Line chart data fromatting
2. Data is not getting exported from Firestore when running in local emulator
3. Edit widget functionality isn't supported yet
4. The raw data is read from filesysyem rather than storing on the database
