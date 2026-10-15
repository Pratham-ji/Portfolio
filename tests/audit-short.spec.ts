import { test, expect } from '@playwright/test';

test('Capture Projects', async ({ page }) => {
  await page.addInitScript((theme) => {
    localStorage.setItem('pratham_os_settings', JSON.stringify({ state: { settings: { theme: 'dark', platformTheme: 'windows', desktopWallpaper: 'default' } } }));
  }, 'dark');
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  await page.dblclick('text="Projects"');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/10_projects_glass.png', fullPage: true });
});
