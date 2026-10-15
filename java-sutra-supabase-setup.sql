-- =====================================================================
-- Java Sutra: cloud accounts (user + admin) that work on every device
-- Run this ONCE in Supabase: SQL Editor -> New query -> paste -> Run
--
-- BEFORE RUNNING: replace YOUR_ADMIN_EMAIL@example.com below (one place)
-- with the email you will use for the admin account.
-- Whoever signs up with that exact email becomes the admin.
-- Everyone else is a normal user. Admins can promote others later
-- from the Admin panel inside the app.
-- =====================================================================

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  name        text not null default '',
  role        text not null default 'user' check (role in ('user','admin')),
  created_at  timestamptz not null default now(),
  last_login  timestamptz,
  updated_at  timestamptz not null default now(),
  data        jsonb not null default '{}'::jsonb   -- progress, bookmarks, notes
);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Each user reads/updates only their own row. Admins can read every row.
drop policy if exists "read own or admin" on public.profiles;
create policy "read own or admin" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "update own" on public.profiles;
create policy "update own" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Users can only change name, data and last_login. Nobody can edit their own role.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (name, data, last_login) on public.profiles to authenticated;

-- Keep updated_at on the server clock (used to detect changes from other devices)
create or replace function public.touch_profile() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_profile();

-- Create a profile automatically for every new sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(nullif(new.raw_user_meta_data->>'name', ''), split_part(new.email, '@', 1)),
    case when lower(new.email) = lower('YOUR_ADMIN_EMAIL@example.com') then 'admin' else 'user' end
  );
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Admin tools (called from the Admin panel)
create or replace function public.admin_set_role(uid uuid, new_role text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Only admins can change roles.'; end if;
  if new_role not in ('user','admin') then raise exception 'Invalid role.'; end if;
  if new_role = 'user' and (select count(*) from public.profiles where role = 'admin' and id <> uid) = 0 then
    raise exception 'There must be at least one admin.';
  end if;
  update public.profiles set role = new_role where id = uid;
end $$;

create or replace function public.admin_delete_user(uid uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Only admins can delete users.'; end if;
  if uid = auth.uid() then raise exception 'Use "Delete my account" to remove your own account.'; end if;
  delete from auth.users where id = uid;   -- profile row is removed by cascade
end $$;

create or replace function public.delete_me()
returns void language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() and (select count(*) from public.profiles where role = 'admin') < 2 then
    raise exception 'Make another user admin before deleting the last admin account.';
  end if;
  delete from auth.users where id = auth.uid();
end $$;

revoke execute on function public.admin_set_role(uuid, text), public.admin_delete_user(uuid), public.delete_me() from public, anon;
grant  execute on function public.admin_set_role(uuid, text), public.admin_delete_user(uuid), public.delete_me() to authenticated;

-- If you already signed up BEFORE running this file, make yourself admin with:
--   insert into public.profiles (id, email, name, role)
--   select id, email, split_part(email,'@',1), 'admin' from auth.users
--   where lower(email) = lower('YOUR_ADMIN_EMAIL@example.com')
--   on conflict (id) do update set role = 'admin';
