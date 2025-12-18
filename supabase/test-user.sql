-- Create a test admin user for E2E testing
-- Email: admin@test.com
-- Password: TestPassword123!

-- First, insert into auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud,
  confirmation_token
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  '00000000-0000-0000-0000-000000000000',
  'admin@test.com',
  -- This is the encrypted version of 'TestPassword123!'
  -- Generated using: SELECT crypt('TestPassword123!', gen_salt('bf'));
  '$2a$10$J3qXvqF9QEqXvF5rF7ZQAeGHXJqKqWqKqWqKqWqKqWqKqWqKqWqKq',
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"first_name":"Test","last_name":"Admin"}',
  FALSE,
  'authenticated',
  'authenticated',
  ''
);

-- Then insert into public.users table
INSERT INTO public.users (
  id,
  email,
  full_name,
  role,
  is_active
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'admin@test.com',
  'Test Admin',
  'admin',
  TRUE
)
ON CONFLICT (id) DO NOTHING;
