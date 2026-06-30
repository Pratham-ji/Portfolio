# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: desktop.spec.ts >> PrathamOS Desktop >> should load desktop and start menu
- Location: tests/desktop.spec.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Pinned Apps')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Pinned Apps')

```

```yaml
- main "Desktop Environment":
  - grid "Desktop Icons":
    - button "README.md": FileCode README.md
- navigation "Taskbar":
  - button "Start Menu"
  - button "Toggle Theme"
  - button "Notifications"
  - text: 04:50 PM Jun 30, 2026
- text: Type here to search...
- heading "Pinned" [level=3]
- button "Terminal"
- button "File Explorer"
- button "Projects"
- button "GitHub"
- button "LeetCode"
- button "Skills"
- button "Experience"
- button "Resume"
- button "Contact"
- button "About"
- button "Achievements"
- button "Research"
- button "Settings"
- text: Pratham Administrator
- button "Settings"
- button "Shut Down"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('PrathamOS Desktop', () => {
  4  |   test('should load desktop and start menu', async ({ page }) => {
  5  |     await page.goto('/');
  6  | 
  7  |     // Check if taskbar exists
  8  |     const taskbar = page.locator('nav[aria-label="Taskbar"]');
  9  |     await expect(taskbar).toBeVisible();
  10 | 
  11 |     // Open Start Menu
  12 |     const startBtn = page.getByRole('button', { name: 'Start Menu' });
  13 |     await startBtn.click();
  14 | 
  15 |     // Check if start menu opens
  16 |     const startMenu = page.getByText('Pinned Apps');
> 17 |     await expect(startMenu).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  18 |   });
  19 | 
  20 |   test('should open an application from start menu', async ({ page }) => {
  21 |     await page.goto('/');
  22 | 
  23 |     // Open Start Menu
  24 |     await page.getByRole('button', { name: 'Start Menu' }).click();
  25 | 
  26 |     // Click on Terminal app (we have an aria-label or text)
  27 |     const terminalApp = page.getByText('Terminal').first();
  28 |     await terminalApp.click();
  29 | 
  30 |     // Check if Terminal window opens
  31 |     const windowTitle = page.getByText('Terminal', { exact: true }).first();
  32 |     await expect(windowTitle).toBeVisible();
  33 |   });
  34 | });
  35 | 
```