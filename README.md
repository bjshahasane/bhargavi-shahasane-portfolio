# Bhargavi Shahasane — Portfolio Monorepo

A Turborepo monorepo containing my portfolio and projects, all deployed on Vercel.

## Apps

| App | Description | Local Port |
|-----|-------------|------------|
| `apps/portfolio` | Personal portfolio website | 3000 |
| `apps/business-tracker` | Business order & expense tracker (Scentique) | 3001 |
| `apps/restaurant-pos` | Restaurant Point-of-Sale system | 3002 |

## Getting Started

### 1. Install dependencies (from root)
```bash
npm install
```

### 2. Set up environment variables

Each app has a `.env.example` file. Copy it and fill in your values:

```bash
# Portfolio
cp apps/portfolio/.env.example apps/portfolio/.env.local

# Business Tracker
cp apps/business-tracker/.env.example apps/business-tracker/.env.local

# Restaurant POS
cp apps/restaurant-pos/.env.example apps/restaurant-pos/.env.local
```

### 3. Run all apps in development
```bash
npm run dev
```

Or run a single app:
```bash
npm run dev:portfolio
npm run dev:business-tracker
npm run dev:restaurant-pos
```

## Deploying to Vercel

Each app is deployed as a **separate Vercel project** pointing to this same GitHub repo.

When creating a Vercel project for each app, set the **Root Directory** accordingly:

| Vercel Project | Root Directory |
|----------------|----------------|
| Portfolio | `apps/portfolio` |
| Business Tracker | `apps/business-tracker` |
| Restaurant POS | `apps/restaurant-pos` |

Vercel auto-detects Next.js — no extra build config needed.

> ⚠️ Remember to add your environment variables in each Vercel project's **Settings → Environment Variables**.

## Tech Stack

- **Framework:** Next.js
- **Monorepo Tool:** Turborepo
- **Deployment:** Vercel
