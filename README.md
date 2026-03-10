# Website_v2

Vortex Website Repository

## Backend Setup (PocketBase)

Follow these steps to set up the backend locally.

### 1. Download PocketBase for your OS

1. Go to the PocketBase website: `https://pocketbase.io/docs/`
2. Download the PocketBase executable for your operating system (macOS, Windows, or Linux).

### 2. Add PocketBase to this project folder

1. Place the downloaded executable inside the `Website_v2` root folder.
2. The file should be named `pocketbase` (or `pocketbase.exe` on Windows).

### 3. Start PocketBase from the `Website_v2` folder

Run this command from the `Website_v2` folder when launching the backend:

```bash
./pocketbase serve --automigrate
```

This starts PocketBase and automatically records/applies migration changes when you make database schema updates. Run this command each time you want to run the backend. 

This is best practice while in development, cannot use this command when we actually launch the website. 

Note about Git syncing: records created in your local PocketBase database are not synced to Git, and this is intentional. We do this to avoid merge conflicts and accidental overwrites when multiple teammates commit.

### 4. Admin login

Use the seeded admin account:

- Email: `web@vortexntnu.no`
- Password: `vortex_pass_2026`

Admin dashboard URL:

- `http://127.0.0.1:8090/_/`


