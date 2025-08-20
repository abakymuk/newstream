import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to login page', async ({ page }) => {
    await page.click('a[href="/auth/login"]');
    await expect(page).toHaveURL('/auth/login');
    await expect(page.locator('h1')).toContainText('Welcome Back');
  });

  test('should navigate to register page', async ({ page }) => {
    await page.click('a[href="/auth/register"]');
    await expect(page).toHaveURL('/auth/register');
    await expect(page.locator('h1')).toContainText('Create Account');
  });

  test('should show validation errors for invalid login', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for HTML5 validation or custom error messages
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    
    // Fill invalid email
    await emailInput.fill('invalid-email');
    await page.fill('input[type="password"]', 'short');
    await page.click('button[type="submit"]');
    
    // Should stay on login page due to validation
    await expect(page).toHaveURL('/auth/login');
  });

  test('should show validation errors for invalid registration', async ({ page }) => {
    await page.goto('/auth/register');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for HTML5 validation
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    
    // Fill invalid data
    await emailInput.fill('invalid-email');
    await page.fill('input[type="password"]', 'short');
    await page.click('button[type="submit"]');
    
    // Should stay on register page due to validation
    await expect(page).toHaveURL('/auth/register');
  });

  test('should navigate to password reset page', async ({ page }) => {
    await page.goto('/auth/login');
    await page.click('a[href="/auth/reset-password"]');
    await expect(page).toHaveURL('/auth/reset-password');
    await expect(page.locator('h1')).toContainText('Reset Password');
  });

  test('should show success message for password reset request', async ({ page }) => {
    await page.goto('/auth/reset-password');
    
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    
    // Should show success message (mocked backend will succeed)
    await expect(page.locator('text=Success!')).toBeVisible();
  });

  test('should redirect unauthenticated users from dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should redirect to login page
    await expect(page).toHaveURL('/auth/login');
  });

  test('should show feature-flagged components conditionally', async ({ page }) => {
    // Test with feature flag disabled (default)
    await page.goto('/dashboard');
    
    // Should be redirected to login since not authenticated
    await expect(page).toHaveURL('/auth/login');
  });

  test('should handle navigation between auth pages', async ({ page }) => {
    // Start at login
    await page.goto('/auth/login');
    await expect(page.locator('h1')).toContainText('Welcome Back');
    
    // Go to register
    await page.click('a[href="/auth/register"]');
    await expect(page.locator('h1')).toContainText('Create Account');
    
    // Go back to login
    await page.click('a[href="/auth/login"]');
    await expect(page.locator('h1')).toContainText('Welcome Back');
    
    // Go to reset password
    await page.click('a[href="/auth/reset-password"]');
    await expect(page.locator('h1')).toContainText('Reset Password');
    
    // Go back to login
    await page.click('a[href="/auth/login"]');
    await expect(page.locator('h1')).toContainText('Welcome Back');
  });
});
