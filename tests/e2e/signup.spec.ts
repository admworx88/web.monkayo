import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';

  test.beforeEach(async ({ page }) => {
    // Navigate to signup page before each test
    await page.goto('/signup');
  });

  test('should display signup page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Sign Up/);

    // Check main heading
    await expect(page.locator('h1')).toContainText('Create an account');

    // Check form elements exist
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show error when passwords do not match', async ({ page }) => {
    // Fill in the form with mismatched passwords
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', 'DifferentPassword123!');

    // Check the terms checkbox
    await page.click('#terms');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForTimeout(500);

    // Should still be on signup page
    expect(page.url()).toContain('/signup');
  });

  test('should show error when terms are not accepted', async ({ page }) => {
    // Fill in the form without accepting terms
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);

    // DO NOT check the terms checkbox

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForTimeout(500);

    // Should still be on signup page
    expect(page.url()).toContain('/signup');
  });

  test('should successfully sign up and redirect to dashboard', async ({ page }) => {
    // Fill in the signup form
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);

    // Check the terms checkbox
    await page.click('#terms');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });

    // Verify we're on the dashboard
    expect(page.url()).toContain('/dashboard');

    // Check for dashboard elements
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});
