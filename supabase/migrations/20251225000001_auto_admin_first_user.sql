-- =============================================
-- AUTO-ASSIGN FIRST USER AS ADMIN
-- =============================================
-- This migration creates a trigger that automatically
-- assigns the 'admin' role to the first user who signs up

-- Create trigger function
CREATE OR REPLACE FUNCTION public.auto_assign_first_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the first user
  IF (SELECT COUNT(*) FROM public.users) = 0 THEN
    -- Assign admin role to the first user
    NEW.role := 'admin';
    NEW.is_active := true;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that runs BEFORE inserting new user
CREATE TRIGGER assign_first_user_as_admin
  BEFORE INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_assign_first_admin();

-- Comment for documentation
COMMENT ON FUNCTION public.auto_assign_first_admin() IS
'Automatically assigns admin role to the first user who registers in the system';
