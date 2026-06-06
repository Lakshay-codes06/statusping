# StatusPing

> Zero-cost uptime monitoring powered by GitHub Actions — because Vercel's hobby cron wasn't going to cut it.

**StatusPing** monitors your websites 24/7, tracks SSL certificate health, measures response times, fires email alerts the moment something breaks, and gives your users a public status page to check themselves.
🌐 Live Demo

https://statusping-opal.vercel.app

📂 GitHub Repository

https://github.com/Lakshay-codes06/statusping

![Dashboard]<img src="https://github.com/user-attachments/assets/3dd354db-6903-4ca8-aa0b-5e0827336d2e" />

---

## The Problem

Most uptime monitoring tools either cost money or require a persistent server to run scheduled checks. Vercel's Hobby plan caps cron jobs at once per day — useless for real monitoring.

**StatusPing solves this by using GitHub Actions as a zero-cost cron scheduler**, pinging a Next.js API route every 5 minutes with no infrastructure to manage and no credit card required.

---

## Features

| Feature | Details |
|---|---|
| Uptime monitoring | HTTP checks every 5 minutes via GitHub Actions cron |
| SSL tracking | Certificate expiry parsed and alerted at 30 / 14 / 7 days |
| Response time analytics | Per-check latency stored and visualised over time |
| Incident management | Auto-created on consecutive failures, auto-resolved on recovery |
| Public status pages | Shareable `/status/:slug` page for your users |
| Email alerts | Transactional alerts via Resend on incident open and resolve |
| AI incident drafts | OpenAI-generated first-draft update to post to your status page |
| Real-time dashboard | Supabase Realtime subscriptions — no polling |

---

## Architecture

The core insight: **use GitHub Actions as a distributed cron system instead of a persistent server.**

```
GitHub Actions (every 5 min)
        │
        ▼
  POST /api/cron/ping          ← secured with CRON_SECRET header
        │
        ├── Fetch target URL   ← measure latency, capture status code
        │
        ├── Parse SSL cert     ← extract expiry via tls.connect()
        │
        ▼
    Supabase
        │
        ├── upsert ping_checks (status, response_time, checked_at)
        │
        └── if N consecutive failures:
                ├── create incident record
                ├── send email via Resend to all subscribers
                └── generate AI draft via OpenAI for status page update
```

### Why GitHub Actions and not Vercel cron?

Vercel Hobby plan allows one cron invocation per day. Vercel Pro costs $20/month just to unlock proper cron. GitHub Actions gives 2,000 free minutes/month — more than enough for 5-minute checks across multiple monitors at zero cost.

The tradeoff: GitHub Actions has ~15–30s cold start variance. For uptime monitoring (not millisecond-precision SLA tracking), this is acceptable.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | API routes + React frontend in one repo |
| Language | TypeScript (strict mode) | Type safety across DB schema, API, and UI |
| Database | Supabase (PostgreSQL) | Row-level security, Realtime subscriptions, free tier |
| Scheduler | GitHub Actions | Zero-cost cron without a persistent server |
| Email | Resend | Developer-first transactional email, generous free tier |
| AI | OpenAI GPT-4o-mini | Incident update draft generation |
| Deployment | Vercel | Preview deployments per branch, instant rollbacks |

---

## Database Schema

```sql
-- Monitors: the sites being watched
create table monitors (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users,
  name        text not null,
  url         text not null,
  interval    int  default 5,       -- minutes
  is_active   bool default true,
  created_at  timestamptz default now()
);

-- Individual ping results
create table ping_checks (
  id              uuid primary key default gen_random_uuid(),
  monitor_id      uuid references monitors on delete cascade,
  status          text check (status in ('up','down','timeout')),
  status_code     int,
  response_time   int,              -- milliseconds
  ssl_days_left   int,
  checked_at      timestamptz default now()
);

-- Incidents: created automatically on consecutive failures
create table incidents (
  id           uuid primary key default gen_random_uuid(),
  monitor_id   uuid references monitors on delete cascade,
  title        text,
  status       text check (status in ('open','monitoring','resolved')),
  ai_draft     text,               -- OpenAI-generated update draft
  started_at   timestamptz default now(),
  resolved_at  timestamptz
);

-- Subscribers: users who get email alerts for a monitor
create table subscribers (
  id          uuid primary key default gen_random_uuid(),
  monitor_id  uuid references monitors on delete cascade,
  email       text not null,
  confirmed   bool default false,
  created_at  timestamptz default now()
);
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free)
- A [Resend](https://resend.com) account (free)
- An [OpenAI](https://platform.openai.com) API key
- A GitHub repository to host the Actions scheduler

### 1. Clone and install

```bash
git clone https://github.com/Lakshay-codes06/statusping.git
cd statusping
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=re_your_key

# OpenAI
OPENAI_API_KEY=sk-your-key

# Security: shared secret between GitHub Actions and your API
CRON_SECRET=your-random-secret-min-32-chars

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up the database

Run the SQL from the [Database Schema](#database-schema) section in your Supabase SQL editor, or use the migration file:

```bash
# Coming soon: Supabase CLI migrations
```

### 4. Configure the GitHub Actions scheduler

In your GitHub repo → Settings → Secrets, add:

```
APP_URL          = https://your-app.vercel.app
CRON_SECRET      = (same value as in .env.local)
```

The workflow at `.github/workflows/ping.yml` runs every 5 minutes automatically once the secrets are set.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
|NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
CRON_SECRET=
RESEND_API_KEY=
SLACK_WEBHOOK_URL=
OPENROUTER_API_KEY=                                                                 
---

## The Engineering Decisions

### 1. GitHub Actions as a cron scheduler

**Problem:** Vercel Hobby cron fires once per day. Vercel Pro is $20/month.  
**Solution:** A GitHub Actions workflow on a `schedule` trigger hits the `/api/cron/ping` endpoint every 5 minutes.  
**Tradeoff:** ~15–30s timing variance vs zero infrastructure cost. Acceptable for availability monitoring.

### 2. Consecutive failure threshold before alerting

**Problem:** A single timeout causes a false-positive alert.  
**Solution:** Incidents are only created after 2 consecutive `down` results. One failure is logged but silent.  
**Tradeoff:** A 10-minute genuine outage before alert vs zero false positives.

### 3. SSL parsing without a third-party service

**Problem:** External SSL-checking APIs add latency, cost, and a dependency.  
**Solution:** Node's built-in `tls.connect()` to extract certificate metadata server-side.  
**Result:** No external dependency, runs in the same API call as the ping.

### 4. Supabase Realtime for dashboard updates

**Problem:** Polling the API every N seconds wastes bandwidth and adds latency.  
**Solution:** Supabase Realtime subscriptions push DB changes to the dashboard instantly.  
**Result:** Dashboard reflects a new ping result within ~200ms of it being written.

---

## Project Structure

```
statusping/
├── app/
│   ├── (auth)/              # Login, signup pages
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── monitors/        # Monitor list + detail
│   │   ├── incidents/       # Incident management
│   │   └── settings/        # Account + notification settings
│   ├── api/
│   │   ├── cron/ping/       # POST endpoint called by GitHub Actions
│   │   ├── monitors/        # CRUD for monitor management
│   │   └── incidents/       # Incident update + resolution
│   └── status/[slug]/       # Public status page
├── components/              # Shared UI components
├── lib/
│   ├── supabase/            # Client + server Supabase instances
│   ├── ping.ts              # HTTP check + response time logic
│   ├── ssl.ts               # TLS certificate parsing
│   ├── email.ts             # Resend email templates
│   └── ai.ts                # OpenAI incident draft generation
├── .github/
│   └── workflows/
│       └── ping.yml         # GitHub Actions cron scheduler
└── .env.example
```

---

## Roadmap

- [ ] Multi-region checks (US, EU, Asia via GitHub Actions matrix)
- [ ] Response time anomaly detection (EWMA-based degradation alerts)
- [ ] Slack / Discord webhook notifications
- [ ] Custom check intervals per monitor
- [ ] HTTP POST monitors (not just GET)
- [ ] Maintenance windows (suppress alerts during deploys)
- [ ] Supabase CLI migration files
- [ ] Test suite (Vitest + Playwright)

---

## Contributing

Contributions are welcome. Please open an issue before submitting a PR for large changes.

```bash
git checkout -b feat/your-feature
npm run lint
npm run build
# open a PR against main
```

---

## License

MIT — use it, fork it, self-host it.

---

## Author

Built by [Lakshay](https://github.com/Lakshay-codes06) · 3rd year B.Tech student  
Open to internship opportunities — [LinkedIn](https://www.linkedin.com/in/lakshay-verma-832b13304/)

