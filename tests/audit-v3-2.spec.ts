import { test, expect } from '@playwright/test';

test('Capture Desktop v3.2', async ({ page }) => {
  await page.addInitScript((theme) => {
    localStorage.setItem('pratham_os_settings', JSON.stringify({ state: { settings: { theme: 'dark', platformTheme: 'windows', desktopWallpaper: 'default' } } }));
    localStorage.setItem('pratham_os_shell', JSON.stringify({ state: { powerState: 'on', isStartMenuOpen: true, userProfile: { username: 'Pratham', isLoggedIn: true } } }));
  }, 'dark');
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/12_windows_v3_2_start_menu.png', fullPage: true });

  await page.click('button[aria-label="Start Menu"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/13_windows_v3_2_desktop.png', fullPage: true });
});
