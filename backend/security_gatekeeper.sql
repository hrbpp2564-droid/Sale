-- BWP Vantage — security gatekeeper (APPLIED to Supabase project botyvrujnvttfcyyvxuw)
-- Goal: no sales data leaks. The anon key (embedded in the static site, as is normal)
-- can read/write NOTHING directly. All access goes through password-checked functions.

create extension if not exists pgcrypto with schema extensions;

-- private secret store (RLS on, NO policies => unreachable by anon/authenticated)
create table if not exists public.app_secrets (
  key text primary key, hash text not null, updated_at timestamptz default now()
);
alter table public.app_secrets enable row level security;

-- shared password (rotate via set_dashboard_pass). Default: BWP-Sales#2569
insert into public.app_secrets(key, hash)
values ('dashboard_pass', extensions.crypt('BWP-Sales#2569', extensions.gen_salt('bf')))
on conflict (key) do nothing;

-- remove every public/anon policy: direct table access is denied for anon
drop policy if exists "public read dashboard" on public.dashboard_data;
drop policy if exists "anon insert dashboard" on public.dashboard_data;
drop policy if exists "anon update dashboard" on public.dashboard_data;
drop policy if exists "public read monthly"   on public.sales_monthly_2569;
drop policy if exists "public read products"  on public.sales_products_2569;
drop policy if exists "public read customers" on public.sales_customers_2569;

-- READ gate: returns payload only with the correct password
create or replace function public.get_dashboard(pass text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare ok boolean; result jsonb;
begin
  select (hash = extensions.crypt(pass, hash)) into ok from public.app_secrets where key='dashboard_pass';
  if not coalesce(ok,false) then perform pg_sleep(0.4); raise exception 'unauthorized'; end if;
  select payload into result from public.dashboard_data where id='bwp';
  return result;
end; $$;

-- SAVE gate: upserts payload only with the correct password
create or replace function public.save_dashboard(pass text, new_payload jsonb)
returns void language plpgsql security definer set search_path = public, extensions as $$
declare ok boolean;
begin
  select (hash = extensions.crypt(pass, hash)) into ok from public.app_secrets where key='dashboard_pass';
  if not coalesce(ok,false) then perform pg_sleep(0.4); raise exception 'unauthorized'; end if;
  insert into public.dashboard_data(id, payload, updated_at) values ('bwp', new_payload, now())
  on conflict (id) do update set payload=excluded.payload, updated_at=now();
end; $$;

-- rotate the shared password (needs the current one)
create or replace function public.set_dashboard_pass(old_pass text, new_pass text)
returns void language plpgsql security definer set search_path = public, extensions as $$
declare ok boolean;
begin
  select (hash = extensions.crypt(old_pass, hash)) into ok from public.app_secrets where key='dashboard_pass';
  if not coalesce(ok,false) then perform pg_sleep(0.4); raise exception 'unauthorized'; end if;
  update public.app_secrets set hash = extensions.crypt(new_pass, extensions.gen_salt('bf')), updated_at=now()
   where key='dashboard_pass';
end; $$;

revoke all on function public.get_dashboard(text)            from public;
revoke all on function public.save_dashboard(text, jsonb)    from public;
revoke all on function public.set_dashboard_pass(text, text) from public;
grant execute on function public.get_dashboard(text)            to anon, authenticated;
grant execute on function public.save_dashboard(text, jsonb)    to anon, authenticated;
grant execute on function public.set_dashboard_pass(text, text) to anon, authenticated;

-- To change the password later, run in SQL editor:
--   select public.set_dashboard_pass('BWP-Sales#2569', 'YOUR-NEW-PASSWORD');
