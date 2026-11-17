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
2. In Render, create a new **Web Service** from that repository. Use `npm run build` as the build command and `npm start` as the start command. Render can also read these settings from `render.yaml`.
3. After deployment, open the service's **Settings → Custom Domains** and add your domain.
4. Add the DNS records Render provides in your domain registrar's DNS dashboard, then verify the domain in Render.

The site is served by a small Node web server. It does not require secrets yet. When an AI API is added, store its key in Render under **Environment** (for example, `OPENAI_API_KEY`) and access it only from server-side code—never from browser JavaScript.

## Updating recommendations

Tool profiles live in `src/app.js`. Keep descriptions directional and re-check product capabilities before making major changes; AI products and plans change frequently.
