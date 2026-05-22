
create table if not exists public.site_settings (
  id boolean primary key default true,
  phone text,
  email text,
  address_en text,
  address_ar text,
  about_en text,
  about_ar text,
  about_p2_en text,
  about_p2_ar text,
  hours_weekdays_time text,
  hours_friday_time text,
  map_url text,
  updated_at timestamptz not null default now(),
  constraint singleton check (id = true)
);

alter table public.site_settings enable row level security;

create policy "anyone reads site settings"
  on public.site_settings for select
  to public using (true);

create policy "admins update site settings"
  on public.site_settings for update
  to authenticated using (has_role(auth.uid(),'admin'));

create policy "admins insert site settings"
  on public.site_settings for insert
  to authenticated with check (has_role(auth.uid(),'admin'));

insert into public.site_settings (id, phone, email, address_en, address_ar, about_en, about_ar, about_p2_en, about_p2_ar, hours_weekdays_time, hours_friday_time)
values (true, '+966 50 000 0000', 'hello@monkeys.coffee',
  'King Fahd Road, Riyadh', 'شارع الملك فهد، الرياض',
  'We opened in 2023 with one obsession: honest coffee for a fast city. Every bean is sourced, every cup is poured with the same idea — slow down, taste the detail.',
  'في ٢٠٢٣ فتحنا أبوابنا لنقدّم قهوة صادقة في مدينة تتسارع. كل حبة نختارها، كل فنجان نصبّه، هو دعوة للتمهّل قليلاً والاستمتاع بالتفاصيل.',
  'Good cafés are built on three things: fresh beans, a barista who cares, and a guest who deserves the best.',
  'نؤمن أن المقاهي الجيدة تُبنى على ثلاثة: حبوب طازجة، باريستا شغوف، وضيف يستحق الأفضل.',
  '7:00 AM – 12:00 AM', '2:00 PM – 1:00 AM')
on conflict (id) do nothing;
