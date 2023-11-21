# Betify_API

A REST API built in TypeScript for online betting sites.

## Description

This is a Web Service built for Technical Challenge Driven "How much do you want to bet?" in the JavaScript/TypeScript ecosystem using Node.js with Express.js for the server, PrismaORM with PostgreSQL for the database, Joi for runtime validations, Jest with Supertest and Faker for automated tests, ESLint and Prettier for code patterns.
The architectural layers were built based on the MVC pattern.

## Demo

### Deploy API link: https://betify-api.onrender.com

<br />

## Quick start

Clone the repository and follow the list of commands to install the dependencies, prepare the database and run the application locally in development mode.

```bash
git clone https://github.com/422UR4H/Betify_API
cd Betify_API
npm install
```

Create a .env file following the .env.example to connect the server to a database.

```bash
DATABASE_URL=# local database link
PORT=5000
```

A local database or an deployed database can be used.
Here's a deployed database used in that project:

```url
postgres://betify_db_user:Ct5wV7MjSXt1yxdY7GvH93mieXUn1373@dpg-cl8mdgf6e7vc73a7uf60-a.oregon-postgres.render.com/betify_db
```

Finally, run:

```bash
npm run migrate:dev
npm run dev
```

## Usage

### How it works?

Owns the entities: `participant`, `game` and `bet`.

The characteristics of these entities are in `src/schemas`.

### Routers:

- GET `/health`: To get API state

- GET `/participants`: To get all participants

- GET `/games`: To get all games

- GET `/games/:id`: To get a specific game with your bets in a array

- POST `/participants`: To create a participant with body:

```yml
{
  "name": "string",
  "balance": number, # in cents (min 1000)
}
```

- POST `/games`: To create a game with body:

```yml
{
  "homeTeamName": "string",
  "awayTeamName": "string"
}
```

- POST `/bets`: To create a bet and liquidate amount bet in participant's balance, with body:

```yml
{
  "homeTeamScore": number,
  "awayTeamScore": number,
  "participantId": number,
  "amountBet": number,
  "gameId": number
}
```

- POST `/games/:id/finish`: To finish a game and increase the balance of winner participants, with body:

```yml
{
  "homeTeamScore": number,
  "awayTeamScore": number
}
```

If the structure is not respected, a 422 error is returned.

# Technologies used

For this project, we used:

- Node (version 18.17.0);
- Express;
- TypeScript;
- PostgreSQL;
- Jest;
- Faker;
- Supertest;
- ESLint;
- Prettier;

## Tests

### Manual

The entire route structure is ready in a thunderClient collection (thunder-collection-betify.json) for manual testing.

### Automatized

A local database or an deployed database can be used.
It is recommended to use another local bank for automated testing.

Create a .env.test file following the .env.example file and insert the test database url to run the automated tests.

Finally, to run the tests, run the command:

```bash
npm run test
// or to test a specific functionality:
npm run test <feat>
// example:
npm run test games
```
