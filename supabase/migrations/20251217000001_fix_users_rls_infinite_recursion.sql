-- =============================================
-- FIX: Infinite recursion in users table RLS
-- =============================================
-- The "Admins can manage all users" policy was querying the users table
-- within a users table policy, causing infinite recursion.
-- Solution: Use the is_admin() helper function which bypasses RLS.

-- Drop the broken policy
DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;

-- Recreate using is_admin() function (SECURITY DEFINER bypasses RLS)
CREATE POLICY "Admins can manage all users"
    ON public.users FOR ALL
    USING (public.is_admin());
