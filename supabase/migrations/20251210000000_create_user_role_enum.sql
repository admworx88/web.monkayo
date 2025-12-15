-- Create user_role enum type
-- This must be created before the users table

CREATE TYPE user_role AS ENUM ('client', 'staff', 'admin');
