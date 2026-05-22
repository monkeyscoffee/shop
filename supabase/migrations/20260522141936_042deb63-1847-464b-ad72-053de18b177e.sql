
-- Roles enum and table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "users view own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles readable by all" on public.profiles for select using (true);
create policy "users update own profile" on public.profiles for update to authenticated using (id = auth.uid());

-- Auto-create profile + default role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)));
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  description_en text,
  description_ar text,
  price numeric(10,2) not null default 0,
  image_url text,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;

create policy "anyone views visible products" on public.products
  for select using (is_visible = true or public.has_role(auth.uid(), 'admin'));

create policy "admins insert products" on public.products
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

create policy "admins update products" on public.products
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "admins delete products" on public.products
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

-- Storage bucket for product images
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "admins upload product images" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

create policy "admins update product images" on storage.objects
  for update to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

create policy "admins delete product images" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

-- Seed a few sample products
insert into public.products (name_en, name_ar, description_en, description_ar, price, sort_order) values
  ('Espresso', 'إسبريسو', 'Bold, rich single shot of pure crema.', 'جرعة قوية غنية من الكريما النقية.', 12, 1),
  ('Cappuccino', 'كابتشينو', 'Velvet milk foam over double espresso.', 'رغوة حليب مخملية فوق إسبريسو مزدوج.', 18, 2),
  ('Iced Latte', 'لاتيه مثلج', 'Chilled espresso, milk, and ice — smooth all day.', 'إسبريسو بارد مع الحليب والثلج — سلس طوال اليوم.', 22, 3),
  ('Spanish Latte', 'لاتيه إسباني', 'Condensed milk sweetness meets espresso intensity.', 'حلاوة الحليب المكثف تلتقي بكثافة الإسبريسو.', 24, 4);
