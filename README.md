# Battleships Game

A simple 2-player turn-based Battleships game built with Next.js, NestJS, and PostgreSQL.

## Requirement

- Docker for run the Postgresql database server
- Node.js v20.11.1 and npm v10.2.4 or `nvm`

## .env setup

First rename `.env.sample` to `.env` in both `./backend` and `./frontend` directories, then you can run application with docker or manually.

If you didn't find `.env.sample` you can create `.env` and add below values for `backend`:

```
PORT=8000
DATABASE_URL=postgresql://postgres:battleshipPostgres@localhost:5432/battleship
```

For the `frontend`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Run with Docker

After setting up .env files, run below command. (This should setup frontend, backend and database)

```bash
docker-compose up --build
```

If this command gives any error, please run the applications manually as below steps.

## To run manually

### 1). Execute this docker command to pull Postgresql container:

Please make sure username, password and db in below command is same as `DATABASE_URL` in `./backend/.env`

```bash
docker run -d \
  --name battleship_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=battleshipPostgres \
  -e POSTGRES_DB=battleship \
  -p 5432:5432 \
  -v battleship_postgres_data:/var/lib/postgresql/data \
  --restart always \
  postgres:16
```

### 2). Run backend:

```bash
cd backend
nvm use # no need to run if you already setup node.js v20.11.1 and npm v10.2.4
npm install
npx prisma generate
npx prisma migrate deploy # This will apply migrations
npx prisma db seed
npm run start:dev
```

### 3). Run frontend:

```bash
cd frontend
nvm use # no need to run if you already setup node.js v20.11.1 and npm v10.2.4
npm install
npm run dev
```

After if everything is running without issue, please visit [http://localhost:3000](http://localhost:3000).

You can access APIs from [http://localhost:8000](http://localhost:8000). Sample API is [http://localhost:8000/api/ship](http://localhost:8000/api/ship)

## API documentation

All the API requests details can be found in `./backend/requests` directory. All the requests are documented using `Bruno` extension in vscode. You can visit to this link for extension. [Bruno extension](https://marketplace.visualstudio.com/items?itemName=bruno-api-client.bruno)
