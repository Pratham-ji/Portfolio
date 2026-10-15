# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: audit-v3-2.spec.ts >> Capture Desktop v3.2
- Location: tests/audit-v3-2.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button[aria-label="Start Menu"]')
    - locator resolved to 2 elements. Proceeding with the first one: <button aria-label="Start Menu" class="↵        flex items-center justify-center w-11 h-11 mx-0.5 rounded-lg transition-all duration-300↵        hover:bg-white/5 hover:-translate-y-0.5 text-blue-400↵      ">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    47 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - grid "Desktop Icons" [ref=e5]:
        - button "README.md" [ref=e6]:
          - img [ref=e8]
          - generic [ref=e13]: README.md
        - button "Terminal" [ref=e14]:
          - img [ref=e16]
          - generic [ref=e18]: Terminal
        - button "Projects" [ref=e19]:
          - img [ref=e21]
          - generic [ref=e23]: Projects
        - button "GitHub" [ref=e24]:
          - img [ref=e26]
          - generic [ref=e28]: GitHub
        - button "LeetCode" [ref=e29]:
          - img [ref=e31]
          - generic [ref=e34]: LeetCode
        - button "Skills" [ref=e35]:
          - img [ref=e37]
          - generic [ref=e40]: Skills
        - button "Experience" [ref=e41]:
          - img [ref=e43]
          - generic [ref=e46]: Experience
        - button "Resume" [ref=e47]:
          - img [ref=e49]
          - generic [ref=e52]: Resume
        - button "Contact" [ref=e53]:
          - img [ref=e55]
          - generic [ref=e58]: Contact
        - button "About" [ref=e59]:
          - img [ref=e61]
          - generic [ref=e64]: About
      - navigation "Taskbar" [ref=e65]:
        - button "Start Menu" [ref=e67]:
          - img [ref=e68]
        - generic [ref=e75]:
          - generic [ref=e76] [cursor=pointer]:
            - img [ref=e77]
            - img [ref=e81]
          - button "Toggle Theme" [ref=e85]:
            - img [ref=e86]
          - button "Notifications" [ref=e92]:
            - img [ref=e93]
          - generic [ref=e96] [cursor=pointer]:
            - generic [ref=e97]: 03:03 PM
            - generic [ref=e98]: Jul 4, 2026
      - generic [ref=e100]:
        - button [ref=e101]:
          - img [ref=e102]
        - generic [ref=e105]:
          - img [ref=e107]
          - heading "Welcome to PrathamOS!" [level=1] [ref=e111]
          - paragraph [ref=e112]: This isn't just a portfolio—it's a fully functional operating system built with React. Feel free to explore the apps, open multiple windows, and check out my work.
          - generic [ref=e113]:
            - button "View Projects" [ref=e114]:
              - img [ref=e115]
              - text: View Projects
            - button "Get Resume" [ref=e118]:
              - img [ref=e119]
              - text: Get Resume
        - generic [ref=e122]:
          - generic [ref=e123]:
            - img [ref=e124]
            - generic [ref=e129]: Built with React & Vite
          - button "Skip Tour" [ref=e130]
    - navigation "Taskbar" [ref=e131]:
      - button "Start Menu" [ref=e133]:
        - img [ref=e134]
      - generic [ref=e141]:
        - generic [ref=e142] [cursor=pointer]:
          - img [ref=e143]
          - img [ref=e147]
        - button "Toggle Theme" [ref=e151]:
          - img [ref=e152]
        - button "Notifications" [ref=e158]:
          - img [ref=e159]
        - generic [ref=e162] [cursor=pointer]:
          - generic [ref=e163]: 03:03 PM
          - generic [ref=e164]: Jul 4, 2026
    - generic [ref=e165] [cursor=pointer]:
      - generic [ref=e166]:
        - heading "15:03" [level=1] [ref=e167]
        - paragraph [ref=e168]: Saturday, July 4
      - generic [ref=e169]: Click or press any key to unlock
  - generic [ref=e171]:
    - button [ref=e172]:
      - img [ref=e173]
    - generic [ref=e176]:
      - img [ref=e178]
      - heading "Welcome to PrathamOS!" [level=1] [ref=e182]
      - paragraph [ref=e183]: This isn't just a portfolio—it's a fully functional operating system built with React. Feel free to explore the apps, open multiple windows, and check out my work.
      - generic [ref=e184]:
        - button "View Projects" [ref=e185]:
          - img [ref=e186]
          - text: View Projects
        - button "Get Resume" [ref=e189]:
          - img [ref=e190]
          - text: Get Resume
    - generic [ref=e193]:
      - generic [ref=e194]:
        - img [ref=e195]
        - generic [ref=e200]: Built with React & Vite
      - button "Skip Tour" [ref=e201]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Capture Desktop v3.2', async ({ page }) => {
  4  |   await page.addInitScript((theme) => {
  5  |     localStorage.setItem('pratham_os_settings', JSON.stringify({ state: { settings: { theme: 'dark', platformTheme: 'windows', desktopWallpaper: 'default' } } }));
  6  |     localStorage.setItem('pratham_os_shell', JSON.stringify({ state: { powerState: 'on', isStartMenuOpen: true, userProfile: { username: 'Pratham', isLoggedIn: true } } }));
  7  |   }, 'dark');
  8  |   await page.goto('http://localhost:5173');
  9  |   await page.waitForTimeout(2000);
  10 |   await page.screenshot({ path: 'screenshots/12_windows_v3_2_start_menu.png', fullPage: true });
  11 | 
> 12 |   await page.click('button[aria-label="Start Menu"]');
     |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  13 |   await page.waitForTimeout(1000);
  14 |   await page.screenshot({ path: 'screenshots/13_windows_v3_2_desktop.png', fullPage: true });
  15 | });
  16 | 
```