import { test } from '@playwright/test';

const navigateAndScreenshot = async (page: any, osTheme: string, name: string) => {
  await page.addInitScript((theme: string) => {
    localStorage.setItem('pratham_os_settings', JSON.stringify({ theme: 'dark', osTheme: theme, animations: false }));
    localStorage.setItem('prathamos_onboarding_seen', 'true');
  }, osTheme);
  
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(4000); // Wait for boot screen
  
  // Click to unlock if on lock screen
  try {
    await page.click('body', { timeout: 1000 });
    await page.waitForTimeout(1000);
  } catch (e) {}

  // Fill password and login
  try {
    await page.fill('input[type="password"]', '1234', { timeout: 1000 });
    await page.press('input[type="password"]', 'Enter');
    await page.waitForTimeout(2500); // Wait for desktop to render
  } catch (e) {}

  // Dismiss Onboarding modal if still present somehow
  try {
    await page.click('text="Skip Tour"', { timeout: 1000 });
    await page.waitForTimeout(1000);
  } catch (e) {}
  
  await page.screenshot({ path: `screenshots/${name}.png` });
};

test.describe('PrathamOS Audit', () => {
  
  test('Capture Desktop Shells', async ({ page }) => {
    await navigateAndScreenshot(page, 'windows', '01_windows_shell');
    await navigateAndScreenshot(page, 'macos', '02_macos_shell');
    await navigateAndScreenshot(page, 'linux', '03_linux_shell');
  });

  test('Capture Mobile and Tablet Viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateAndScreenshot(page, 'windows', '04_mobile_shell');
    
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateAndScreenshot(page, 'macos', '05_tablet_shell');
  });

  test('Capture Applications', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await navigateAndScreenshot(page, 'macos', '06_apps_base');
    
    const appsToOpen = ['Terminal', 'Projects', 'GitHub', 'LeetCode', 'Skills', 'Experience', 'Resume', 'Contact', 'About'];
    
    for (let i = 0; i < appsToOpen.length; i++) {
      const appName = appsToOpen[i];
      try {
        await page.dblclick(`text="${appName}"`, { timeout: 3000 });
        await page.waitForTimeout(1500);
        await page.screenshot({ path: `screenshots/07_app_${appName.replace(' ', '_')}.png` });
        
        await page.click('button[aria-label="Close"]', { timeout: 1000 }).catch(() => {});
        await page.click('.window-close-button', { timeout: 1000 }).catch(() => {});
        await page.waitForTimeout(500);
      } catch (e) {
        console.error(`Failed to open app: ${appName}`);
      }
    }
  });

  test('Capture Start Menu / Dock', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await navigateAndScreenshot(page, 'windows', '08_windows_start_menu_closed');
    
    try {
      await page.click('button[aria-label="Start"]');
      await page.waitForTimeout(500);
      await page.screenshot({ path: `screenshots/09_windows_start_menu_open.png` });
    } catch (e) {}
  });
});
