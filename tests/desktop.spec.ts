import { test, expect } from '@playwright/test';

test.describe('PrathamOS Desktop', () => {
  test('should load desktop and start menu', async ({ page }) => {
    await page.goto('/');

    // Check if taskbar exists
    const taskbar = page.locator('nav[aria-label="Taskbar"]');
    await expect(taskbar).toBeVisible();

    // Open Start Menu
    const startBtn = page.getByRole('button', { name: 'Start Menu' });
    await startBtn.click();

    // Check if start menu opens
    const startMenu = page.getByText('Pinned', { exact: true });
    await expect(startMenu).toBeVisible();
  });

  test('should open an application from start menu', async ({ page }) => {
    await page.goto('/');

    // Open Start Menu
    await page.getByRole('button', { name: 'Start Menu' }).click();

    // Click on Terminal app (we have an aria-label or text)
    const terminalApp = page.getByText('Terminal').first();
    await terminalApp.click();

    // Check if Terminal window opens
    const windowTitle = page.getByText('Terminal', { exact: true }).first();
    await expect(windowTitle).toBeVisible();
  });
});
