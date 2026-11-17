import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const port = Number(process.env.PORT || 8080);
const root = new URL("../dist/", import.meta.url).pathname.replace(/^\/(.:\/)/, "$1");
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json"
};
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", "http://localhost");
  const relativePath = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  const safePath = normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, safePath);

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = join(filePath, "index.html");
    response.writeHead(200, {
      "Content-Type": types[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store, max-age=0",
      "Pragma": "no-cache",
      ...securityHeaders
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
      ...securityHeaders
    });
    response.end("Not found");
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Close the other local server or choose a different PORT.`);
  } else if (error.code === "EACCES") {
    console.error(`Windows blocked access to port ${port}. Try running the terminal as Administrator or choose a different PORT.`);
  } else {
    console.error(error);
  }
  process.exit(1);
});

const host = process.env.HOST || "0.0.0.0";

server.listen(port, host, () => {
  console.log(`AI Scouter is running at http://localhost:${port}`);
});
