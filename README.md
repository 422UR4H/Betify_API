# Betify_API

This is a Web Service built for Technical Challenge Driven "How much do you want to bet?" in the JavaScript/TypeScript ecosystem using Node.js with Express.js for the server, Prisma with PostgreSQL for the database, Joi for runtime validations, Jest with Supertest and Faker for automated tests, ESLint and Prettier for code patterns.
The architectural layers were built based on the MVC pattern.


## Deploy API link

### https://betify-api.onrender.com
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
DATABASE_URL=# endereço do banco local 
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

### To manual tests

The entire route structure is ready in a thunderClient collection (thunder-collection-betify.json) for manual testing.

### To automatized tests

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
