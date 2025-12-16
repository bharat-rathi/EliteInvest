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

### 1. Database Setup (Cloud)

You can use a free cloud PostgreSQL database (e.g., [Neon](https://neon.tech) or [Supabase](https://supabase.com)).

1.  Sign up for **Neon** (it's the easiest).
2.  Create a project.
3.  Copy the **Connection String** (it starts with `postgres://...`).
4.  Open `server/.env` and replace the `DATABASE_URL` with your new connection string:

```
DATABASE_URL=postgres://user:password@ep-cool-site.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Note**: The app is configured to use SSL, which is required by most cloud providers.

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

## Deployment on Vercel

Since this is a monorepo (client and server in one repo), you will deploy **two separate projects** in Vercel from the same Git repository.

### 1. Deploy Backend (API)
1.  Import your GitHub repository into Vercel.
2.  Name the project `eliteinvest-api` (or similar).
3.  **Framework Preset**: Select `Other`.
4.  **Root Directory**: Click "Edit" and select `server`.
5.  **Environment Variables**: Add the following:
    -   `DATABASE_URL`: (Your Neon connection string)
    -   `JWT_SECRET`: (Any specific string)
6.  Click **Deploy**.
7.  Once deployed, copy the **Domain** (e.g., `eliteinvest-api.vercel.app`).

### 2. Deploy Frontend
1.  Import the same GitHub repository again into Vercel.
2.  Name the project `eliteinvest-web`.
3.  **Framework Preset**: Vercel should auto-detect `Vite`.
4.  **Root Directory**: Click "Edit" and select `client`.
5.  **Environment Variables**: Add the following:
    -   `VITE_API_URL`: `https://<YOUR-API-DOMAIN>/api` (e.g., `https://eliteinvest-api.vercel.app/api`)
6.  Click **Deploy**.

Your app is now live!

## Limitations (MVP)

- Data ingestion is currently simulated via the seeding script. Real-time SEC EDGAR parsing would require a robust background worker.
- Authentication is basic (no email verification).
- Error handling is minimal.
