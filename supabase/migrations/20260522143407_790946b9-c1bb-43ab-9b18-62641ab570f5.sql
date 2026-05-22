
-- Create owner user if not exists
do $$
declare
  uid uuid;
begin
  select id into uid from auth.users where email = 'monkeyscoffee2026@monkeys.app';
  if uid is null then
    uid := gen_random_uuid();
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000', uid, 'authenticated', 'authenticated',
      'monkeyscoffee2026@monkeys.app',
      crypt('monkeyscoffee2026', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('username','monkeyscoffee2026'),
      now(), now(), '', '', '', ''
    );
    insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    values (gen_random_uuid(), uid, jsonb_build_object('sub', uid::text, 'email', 'monkeyscoffee2026@monkeys.app'), 'email', uid::text, now(), now(), now());
  end if;

  insert into public.profiles (id, username) values (uid, 'monkeyscoffee2026')
    on conflict (id) do nothing;

  insert into public.user_roles (user_id, role) values (uid, 'admin')
    on conflict do nothing;
  -- ensure admin role exists
  if not exists (select 1 from public.user_roles where user_id = uid and role = 'admin') then
    insert into public.user_roles (user_id, role) values (uid, 'admin');
  end if;
end $$;
