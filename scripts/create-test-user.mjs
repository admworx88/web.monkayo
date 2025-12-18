import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54421';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function ensureTestUser() {
  console.log('Ensuring test user exists...');

  // Try to create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'admin@test.com',
    password: 'TestPassword123!',
    email_confirm: true,
    user_metadata: {
      first_name: 'Test',
      last_name: 'Admin'
    }
  });

  if (authError && authError.code !== 'email_exists') {
    console.error('Error creating auth user:', authError);
    return;
  }

  let userId;
  if (authError && authError.code === 'email_exists') {
    console.log('User already exists, fetching user ID...');
    // Get user by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
      console.error('Error listing users:', listError);
      return;
    }
    const existingUser = users.find(u => u.email === 'admin@test.com');
    if (!existingUser) {
      console.error('Could not find existing user');
      return;
    }
    userId = existingUser.id;
  } else {
    userId = authData.user.id;
    console.log('Auth user created:', userId);
  }

  // The trigger will automatically create the public.users record
  // Now update the role to admin (trigger creates it as 'staff' by default)
  const { data: userData, error: userError } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .eq('id', userId)
    .select()
    .single();

  if (userError) {
    console.error('Error updating user role:', userError);
    return;
  }

  console.log('✅ Test user ready!');
  console.log('Email: admin@test.com');
  console.log('Password: TestPassword123!');
  console.log('Role:', userData.role);
}

ensureTestUser().catch(console.error);
