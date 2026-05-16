-- Phase 1: Booking.com iCal sync + overflow lead routing
-- Apply in Supabase SQL editor or via `supabase db push`.

create extension if not exists "pgcrypto";

-- Blocked dates synced hourly from iCal feeds (Airbnb, Booking.com)
create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  external_id text not null,
  start_date  date not null,
  end_date    date not null,
  source      text not null default 'booking.com',
  created_at  timestamptz not null default now(),
  constraint bookings_external_id_source_key unique (external_id, source)
);

alter table public.bookings enable row level security;

-- Frontend calendar reads blocked dates; no auth required
create policy "public_read_bookings" on public.bookings
  for select using (true);

comment on table public.bookings is
  'Blocked dates upserted from iCal feeds; publicly readable for calendar UI.';

-- Overflow leads: users who selected already-booked dates on Cottage Six.
-- Routed via n8n to WhatsApp so host can offer alternate cottages.
create table if not exists public.overflow_leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  dates      text not null,
  guests     int  not null default 1,
  status     text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.overflow_leads enable row level security;

comment on table public.overflow_leads is
  'Leads for already-booked dates; routed via WhatsApp to offer other cottages.';
