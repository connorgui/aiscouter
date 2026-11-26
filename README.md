# AI Scouter

AI Scouter recommends an AI product based on the work someone is trying to do. It weighs the task type, priorities, budget preference, and keywords in the brief. It also includes saved tools, side-by-side comparison, curated stacks, reusable workflows, use cases, skills, updates, and resources.

Matching still runs entirely in the browser. Optional accounts sync saved tools, appearance preferences, and workflow blueprints between devices. Passwords are salted and hashed, login sessions use HttpOnly cookies, and production account data lives in PostgreSQL.

## Run locally

```bash
npm run build
npm start
```

Then open `http://localhost:8080`.

Local accounts use temporary memory storage unless `DATABASE_URL` is set. They disappear when the local server restarts; this keeps local setup simple while production uses persistent PostgreSQL.

## Validate

```bash
npm test
node scripts/test-auth.mjs
```

## Deploy to Render

The included `render.yaml` describes both the Node Web Service and a PostgreSQL database.

1. Push this folder to GitHub.
2. In Render, choose **New → Blueprint**, connect the repository, and apply `render.yaml`. This creates or updates `ai-scouter` and connects `ai-scouter-db` through `DATABASE_URL`.
3. If keeping an existing manually-created Web Service, create a Render PostgreSQL database separately, then add its internal database URL as the service's `DATABASE_URL` environment variable.
4. Confirm `https://your-service.onrender.com/api/health` returns `{"ok":true,"database":"postgres","accounts":"ready"}` before inviting users to register.
5. For a custom domain, open **Settings → Custom Domains**, add the domain, copy Render's DNS records into your registrar, and verify it in Render.

The site is served by a small Node web server. When an AI API is added, store its key in Render under **Environment** (for example, `OPENAI_API_KEY`) and access it only from server-side code—never from browser JavaScript.

## Account behavior

- Usernames are 3–24 characters; passwords are 8–72 characters.
- **Remember me** creates a 30-day login. Otherwise the cookie expires with the browser session and the server session expires after 12 hours.
- A signed-in account syncs saved tools, themes/settings, and workflow blueprints.
- Profile settings support a display name plus initials, emoji, or a small uploaded image.
- Account deletion requires both the current password and typing `DELETE`, then removes the user, sessions, profile, and synced app data.

## Updating recommendations

Tool profiles live in `src/app.js`. Keep descriptions directional and re-check product capabilities before making major changes; AI products and plans change frequently.
