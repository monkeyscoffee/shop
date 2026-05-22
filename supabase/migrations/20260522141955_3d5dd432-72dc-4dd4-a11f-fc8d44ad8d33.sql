
-- Fix touch_updated_at search_path
create or replace function public.touch_updated_at()
returns trigger language plpgsql security definer set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- Lock down SECURITY DEFINER functions: only the trigger / RLS layer should call them
revoke execute on function public.has_role(uuid, app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;

-- Restrict storage SELECT to single-file reads only (no listing)
drop policy "public read product images" on storage.objects;
create policy "public read product image files" on storage.objects
  for select using (bucket_id = 'product-images' and (storage.foldername(name))[1] is not null);
