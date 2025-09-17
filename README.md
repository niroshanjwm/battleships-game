# Battleships Game

A simple 2-player turn-based Battleships game built with Next.js, NestJS, and PostgreSQL.

## Run with Docker

To quickly run entire application (frontend, backend, and database), simply execute:

```bash
docker-compose up --build
```

## To run manually

1). Execute this docker command to pull Postgresql container:

Please make sure username, password and db is same as below command

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
2). Run backend:
```bash
cd backend
npm run start
```

3). Run frontend:

(Make sure to run `npm run dev` first, as NestJS needs to compile the application before you can run npm start.)
```bash
cd frontend
npm run dev
```
