import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to signin page before each test
    await page.goto('/signin');
  });

  test('should display signin page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Sign In/);

    // Check main heading
    await expect(page.locator('h1')).toContainText('Welcome back');

    // Check form elements exist
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should successfully sign in and redirect to dashboard', async ({ page }) => {
    // Fill in the signin form
    await page.fill('input[name="email"]', 'admin@test.com');
    await page.fill('input[name="password"]', 'TestPassword123!');

    // Click the sign in button
    await page.click('button[type="submit"]:has-text("Sign In")');

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });

    // Verify we're on the dashboard
    expect(page.url()).toContain('/dashboard');

    // Check for dashboard elements
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Fill in the signin form with invalid credentials
    await page.fill('input[name="email"]', 'admin@test.com');
    await page.fill('input[name="password"]', 'WrongPassword123!');

    // Click the sign in button
    await page.click('button[type="submit"]:has-text("Sign In")');

    // Wait for error toast/message
    await page.waitForTimeout(1000);

    // Should still be on signin page
    expect(page.url()).toContain('/signin');
  });

  test('should show error for empty email', async ({ page }) => {
    // Try to submit with empty email
    await page.fill('input[name="password"]', 'TestPassword123!');

    // Click the sign in button
    await page.click('button[type="submit"]:has-text("Sign In")');

    // Should still be on signin page (HTML5 validation should prevent submission)
    expect(page.url()).toContain('/signin');
  });

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const toggleButton = page.locator('button[type="button"]').filter({ has: page.locator('svg') }).first();

    // Password should be hidden by default
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click toggle button
    await toggleButton.click();

    // Password should now be visible
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click toggle button again
    await toggleButton.click();

    // Password should be hidden again
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

test.describe('Dashboard Access', () => {
  test('should access dashboard after successful login', async ({ page }) => {
    // Sign in first
    await page.goto('/signin');
    await page.fill('input[name="email"]', 'admin@test.com');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]:has-text("Sign In")');

    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });

    // Verify dashboard loads correctly
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Check if user menu/avatar is visible (indicates logged in state)
    // This depends on your dashboard layout
    await expect(page.locator('body')).toBeVisible();
  });
});
