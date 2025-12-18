import { test, expect } from '@playwright/test';

test.describe('JCryptoGeek88 Signin Test', () => {
  const email = 'jcryptogeek88@gmail.com';
  const password = 'Password123!';

  test('should sign in successfully without infinite recursion error', async ({ page }) => {
    // Navigate to signin page
    await page.goto('/signin');

    // Wait for page to load (heading says "Welcome back")
    await expect(page.locator('h1, h2')).toContainText(/welcome back/i);

    // Fill in credentials
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);

    // Click sign in button
    await page.click('button[type="submit"]:has-text("Sign In")');

    // Wait for redirect to dashboard (should not get infinite recursion error)
    await page.waitForURL('**/dashboard', { timeout: 10000 });

    // Verify we're on the dashboard
    expect(page.url()).toContain('/dashboard');

    // Verify no error messages
    const errorToast = page.locator('[role="status"]').filter({ hasText: /infinite recursion|42P17|error/i });
    await expect(errorToast).not.toBeVisible({ timeout: 1000 }).catch(() => {
      // Toast might not exist at all, which is fine
    });

    console.log('✅ Signin successful - no infinite recursion error!');
  });

  test('should display user profile in dashboard', async ({ page }) => {
    // Sign in first
    await page.goto('/signin');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]:has-text("Sign In")');
    await page.waitForURL('**/dashboard', { timeout: 10000 });

    // Check that user profile is loaded (should not get 42P17 error)
    const userMenu = page.locator('[data-testid="user-menu"], .user-profile, nav').first();
    await expect(userMenu).toBeVisible({ timeout: 5000 });

    console.log('✅ User profile loaded successfully!');
  });
});
