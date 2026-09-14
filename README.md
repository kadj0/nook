# Nook: Getting Started

Nook is a rental price tracking platform built for the CBF Full Stack Software Development assessment. It helps London renters browse seeded property listings, compare affordability signals, save homes to a watchlist, and keep private notes against individual listings while they decide what is worth pursuing.

The project demonstrates a full-stack data flow: the React and TypeScript frontend fetches listing, watchlist and note data from a Java Spring Boot REST API, and the API persists application data in MySQL. The database is seeded with London rental listings so reviewers can run the app and immediately test search, saved listings, listing detail pages, notes, and the rent calculator.

For more detail on architecture and design decisions, see the [system design document](docs/SDD.md).

---

## Project Structure

```text
nook/
├── api/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/nook/api/
│       │   │   ├── controller/
│       │   │   ├── dto/
│       │   │   ├── exception/        # Central API error handling
│       │   │   ├── model/
│       │   │   ├── repository/
│       │   │   ├── service/
│       │   │   └── ApiApplication.java
│       │   └── resources/
│       │       ├── application.properties
│       │       ├── schema.sql        # Database schema
│       │       └── data.sql          # Seed data
│       └── test/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── assets/
│       │   ├── houses/
│       │   └── svgs/
│       ├── components/
│       ├── data/
│       ├── pages/
│       ├── styles/
│       ├── types/
│       ├── utils/
│       ├── App.tsx
│       └── main.tsx
├── docs/
│   ├── SDD.md                        # System design document
│   └── assets/
│       ├── diagrams/
│       └── images/
├── docker-compose.yml                # Frontend, API and MySQL orchestration
├── .env                              # Docker Compose environment variables
├── ASSESSMENT.md
└── README.md
```

---

## Prerequisites

To run with Docker:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

To run locally without Docker:

- JDK 21
- Node.js 22+
- MySQL 8
- Git

---

## Run With Docker

### 1. Create `.env`

The project uses a root `.env` file for Docker Compose variables. This file is intentionally not committed, so create it in the project root before starting Docker:

```bash
touch .env
```

Add the following values:

```env
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=nook
MYSQL_USER=nook_user
MYSQL_PASSWORD=user_password
```

You can change the password values if needed, but keep `MYSQL_DATABASE=nook` unless you also update the database URL. These values are read by `docker-compose.yml` and passed into the MySQL and Spring Boot containers. The API receives database settings through `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD`.

### 2. Start the stack

From the project root:

```bash
docker compose up --build
```

Docker Compose starts:

- `db` on host port `3307`
- `api` on host port `8080`
- `frontend` on host port `5173`

### 3. Open the app

- Frontend: http://localhost:5173
- Listings API: http://localhost:8080/api/listings
- Swagger UI: http://localhost:8080/swagger-ui/index.html

---

## Run Locally Without Docker

Use this if you want to run each service directly on your machine.

### 1. Start MySQL

Make sure your local MySQL server is running and that the existing `nook` database is available. Then configure `api/local.properties` with your local credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nook
spring.datasource.username=nook_user
spring.datasource.password=your_password
```

`api/local.properties` is intentionally gitignored.

### 2. Start the API

```bash
cd api
./mvnw spring-boot:run
```

Check the API:

```bash
curl http://localhost:8080/api/listings
```

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

---

## Useful Commands

Build the frontend:

```bash
cd frontend
npm run build
```

Package the API without tests:

```bash
cd api
./mvnw -DskipTests package
```

Validate Docker Compose configuration:

```bash
docker compose config
```

Stop Docker containers:

```bash
docker compose down
```

Stop Docker containers and delete the MySQL volume:

```bash
docker compose down -v
```

Use `docker compose down -v` when you change `.env` credentials or want to reseed the database from scratch.

---

## Database and Seed Data

The backend uses SQL files in `api/src/main/resources`:

- `schema.sql` defines the database tables.
- `data.sql` inserts starter listing data.

`spring.sql.init.mode=always` means these scripts run on every API startup. Seed inserts are written to avoid duplicating existing records.

To inspect the Docker database:

```bash
docker compose exec db mysql -u nook_user -p
```

Then:

```sql
USE nook;
SELECT * FROM listings;
SELECT * FROM watchlist_items;
SELECT * FROM listing_notes;
```

---

## API Documentation

Swagger UI is available when the API is running: http://localhost:8080/swagger-ui/index.html

Key endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/listings` | Fetch all listings |
| `GET` | `/api/listings/{id}` | Fetch one listing |
| `GET` | `/api/watchlist` | Fetch saved watchlist items |
| `GET` | `/api/watchlist/ids` | Fetch saved listing IDs |
| `POST` | `/api/watchlist` | Save a listing |
| `DELETE` | `/api/watchlist/{listingId}` | Remove a listing from the watchlist |
| `GET` | `/api/listings/{listingId}/notes` | Fetch notes for a listing |
| `POST` | `/api/listing-notes` | Save a note for a listing |

Example note request:

```json
{
  "listingId": 1,
  "userReference": "demo-user",
  "note": "Ask agent about council tax and broadband."
}
```

Notes are validated by the backend: 
- `listingId` is required
- `note` must not be blank or longer than 1000 characters

---

## Troubleshooting

**The API cannot connect to MySQL**

Check that the database is running and that `.env` or `api/local.properties` contains the correct credentials.

**Docker still uses old database credentials**

MySQL stores credentials in its first-created data volume. Reset the volume:

```bash
docker compose down -v
docker compose up --build
```

**Code changes do not appear in Docker**

Rebuild the images:

```bash
docker compose up --build
```

**Port already in use**

Stop any local services using ports `5173`, `8080` or `3307`, or change the published port in `docker-compose.yml`.
