# EliteInvest Track MVP

EliteInvest Track is a web application that aggregates and displays public investment disclosures from SEC filings (STOCK Act, Form 13F, Form 4, Schedule 13D/G).

## Tech Stack

- **Frontend**: React (Vite), Material UI, Chart.js
- **Backend**: Node.js, Express, Sequelize (PostgreSQL)
- **Database**: PostgreSQL

## Prerequisites

- Node.js (v14+)
- PostgreSQL (running locally)

## Setup Instructions

### 1. Database Setup

Ensure PostgreSQL is running and create a database named `eliteinvest`.

```bash
# If using psql CLI
CREATE DATABASE eliteinvest;
```

Update the `server/.env` file if your database credentials differ from the default:
```
DATABASE_URL=postgres://postgres:password@localhost:5432/eliteinvest
```

### 2. Backend Setup

Navigate to the `server` directory:

```bash
cd server
npm install
```

**Seed the Database:**
Run the seeding script to populate the database with sample data (Nancy Pelosi, Elon Musk, etc.):

```bash
node scripts/seed.js
```

**Start the Server:**

```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup

Navigate to the `client` directory:

```bash
cd client
npm install
```

**Start the Client:**

```bash
npm run dev
```
The client will run on `http://localhost:5173` (or similar).

## Features

- **Dashboard**: View recent filings.
- **Search**: Search for entities (politicians, insiders) or tickers.
- **Profile**: View detailed transaction history and volume charts for an entity.
- **Auth**: Sign up and login (JWT based).

## Deployment

### Heroku (Backend)
1. Create a Heroku app.
2. Add Heroku Postgres addon.
3. Push `server` subtree to Heroku.
4. Set `JWT_SECRET` config var.

### Vercel/Netlify (Frontend)
1. Deploy the `client` directory.
2. Update `client/src/api/axios.js` to point to the deployed backend URL.

## Limitations (MVP)

- Data ingestion is currently simulated via the seeding script. Real-time SEC EDGAR parsing would require a robust background worker.
- Authentication is basic (no email verification).
- Error handling is minimal.
