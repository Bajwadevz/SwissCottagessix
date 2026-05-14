-- Swiss Cottages Six — minimal schema for marketing site
-- Apply in Supabase SQL editor or via `supabase db push`.

create extension if not exists "pgcrypto";

-- Inbound leads (written with service role from /api/lead)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  check_in text,
  check_out text,
  message text,
  source text not null default 'swiss-cottages-six-web',
  n8n_forwarded boolean not null default false
);

alter table public.leads enable row level security;

-- Anonymous users cannot read/write; service role bypasses RLS.
comment on table public.leads is 'Marketing site leads; insert only via service role (Next.js API).';

-- Optional observability for iCal polling
create table if not exists public.ical_snapshots (
  id bigserial primary key,
  fetched_at timestamptz not null default now(),
  block_count int not null default 0,
  sources int not null default 0
);

alter table public.ical_snapshots enable row level security;

comment on table public.ical_snapshots is 'Append-only log of calendar sync runs from /api/calendar.';
