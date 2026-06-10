---
name: use-existing-browser
description: Instructs the agent to connect to the existing browser instance via Chrome DevTools instead of spawning a new one. Use when the agent needs to spawn a server or view, interact with, or test the application in a browser — includes project URL, admin credentials, and Chrome DevTools workflow.
---

# Use Existing Browser

**Do NOT spawn a new browser or dev server.** The application is already running and accessible.

## Project URL

```
https://juanpasabuyph.loc/
```

## Admin Credentials

| Field    | Value              |
|----------|--------------------|
| Email    | admin@example.com  |
| Password | 1234567890         |

## How to Browse

1. Use `chrome-devtools_list_pages` to see open pages.
2. Use `chrome-devtools_new_page` with the project URL if no page is open.
3. Use `chrome-devtools_take_snapshot` to inspect the current page state.
4. Use `chrome-devtools_navigate_page` to navigate to specific routes.
5. Use `chrome-devtools_fill_form` and `chrome-devtools_click` to interact with elements.

## Login Flow

```
1. Navigate to https://juanpasabuyph.loc/login
2. Click advance
3. Click continue unsafe link
4. Fill email and password fields
5. Click the submit button
```

## Common Tasks

- **Check a page**: `navigate_page` → `take_snapshot`
- **Fill a form**: `take_snapshot` → `fill_form` → `click`
- **Debug frontend**: `list_console_messages` or `get_console_message`
- **Check network**: `list_network_requests` or `get_network_request`

## Rules

- Never run `php artisan serve`, `npm run dev`, or any server command — the app is already running.
- Never start a new browser — connect to the existing one via DevTools.
- Always use `take_snapshot` before interacting with elements to get valid UIDs.
