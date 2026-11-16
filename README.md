# AI Scouter

AI Scouter is a fast, browser-only tool that recommends an AI product based on the work someone is trying to do. It weighs the task type, the user's priorities, budget preference, and keywords in their brief. It also includes saved tools, side-by-side comparison, curated stacks, reusable workflows, use cases, skills, updates, and resources.

No user input is transmitted or stored. The matching logic runs entirely in the browser.

## Run locally

```bash
npm run build
npm start
```

Then open `http://localhost:8080`.

## Validate

```bash
npm test
```

## Deploy to Render

1. Push this folder to a GitHub repository.
2. In Render, create a new Blueprint and select that repository. Render will read `render.yaml`.
3. After deployment, open the service's **Settings → Custom Domains** and add your domain.
4. Add the DNS records Render provides in your domain registrar's DNS dashboard, then verify the domain in Render.

The site is static and requires no secrets, server, or database.

## Updating recommendations

Tool profiles live in `src/app.js`. Keep descriptions directional and re-check product capabilities before making major changes; AI products and plans change frequently.
