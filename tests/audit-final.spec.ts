import { test, expect } from '@playwright/test';

test('Capture Desktop Final', async ({ page }) => {
  await page.addInitScript((theme) => {
    localStorage.setItem('pratham_os_settings', JSON.stringify({ state: { settings: { theme: 'dark', platformTheme: 'windows', desktopWallpaper: 'default' } } }));
    localStorage.setItem('pratham_os_shell', JSON.stringify({ state: { powerState: 'on', userProfile: { username: 'Pratham', isLoggedIn: true } } }));
  }, 'dark');
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/11_desktop_final.png', fullPage: true });
});
