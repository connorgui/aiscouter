import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";
import { createAccountStore, httpError } from "./account-store.mjs";

const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || "0.0.0.0";
const root = new URL("../dist/", import.meta.url).pathname.replace(/^\/(.:\/)/, "$1");
const sessionCookie = "ais_session";
const store = await createAccountStore(process.env.DATABASE_URL || "");
const accountsAvailable = store.persistent || !process.env.RENDER;
const attempts = new Map();
const types = {
  ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp"
};
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin"
};

function sendJson(response, statusCode, value) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...securityHeaders });
  response.end(JSON.stringify(value));
}
function parseCookies(request) {
  return Object.fromEntries(String(request.headers.cookie || "").split(";").map((part) => part.trim().split("=")).filter(([key]) => key).map(([key, value = ""]) => [key, decodeURIComponent(value)]));
}
function secureRequest(request) {
  return Boolean(request.socket.encrypted) || String(request.headers["x-forwarded-proto"] || "").split(",")[0].trim() === "https";
}
function setSessionCookie(request, response, token, maxAge) {
  const secure = secureRequest(request) ? "; Secure" : "";
  const persistence = maxAge ? `; Max-Age=${maxAge}` : "";
  response.setHeader("Set-Cookie", `${sessionCookie}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax${secure}${persistence}`);
}
function clearSessionCookie(request, response) {
  const secure = secureRequest(request) ? "; Secure" : "";
  response.setHeader("Set-Cookie", `${sessionCookie}=; Path=/; HttpOnly; SameSite=Lax${secure}; Max-Age=0`);
}
async function readJson(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_500_000) throw httpError(413, "Request body is too large.");
  }
  try { return JSON.parse(body || "{}"); } catch { throw httpError(400, "Invalid JSON request."); }
}
async function currentUser(request) {
  return store.userForSession(parseCookies(request)[sessionCookie]);
}
function rateLimit(request) {
  const key = String(request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown").split(",")[0];
  const now = Date.now();
  const record = attempts.get(key) || { count: 0, resetAt: now + 15 * 60_000 };
  if (record.resetAt <= now) Object.assign(record, { count: 0, resetAt: now + 15 * 60_000 });
  record.count += 1;
  attempts.set(key, record);
  if (record.count > 20) throw httpError(429, "Too many sign-in attempts. Try again in a few minutes.");
}

async function handleApi(request, response, pathname) {
  try {
    if (request.method === "GET" && pathname === "/api/health") {
      sendJson(response, 200, { ok: true, database: store.persistent ? "postgres" : "memory", accounts: accountsAvailable ? "ready" : "configuration-required" }); return true;
    }
    if (!accountsAvailable && request.method === "GET" && pathname === "/api/auth/me") {
      sendJson(response, 200, { signedIn: false, username: null, profileData: null, unavailable: true }); return true;
    }
    if (!accountsAvailable && pathname !== "/api/auth/signout") {
      throw httpError(503, "Accounts are being configured. Connect the Render PostgreSQL database and try again.");
    }
    if (request.method === "GET" && pathname === "/api/auth/me") {
      const user = await currentUser(request);
      sendJson(response, 200, { signedIn: Boolean(user), username: user?.username || null, profileData: user?.profileData || null }); return true;
    }
    if (request.method === "POST" && pathname === "/api/auth/signup") {
      rateLimit(request);
      const input = await readJson(request);
      const user = await store.createAccount(input.username, input.password, input.profileData || {});
      const session = await store.createSession(user.id, Boolean(input.remember));
      setSessionCookie(request, response, session.token, session.maxAge);
      sendJson(response, 201, { signedIn: true, username: user.username, profileData: user.profileData, persistent: store.persistent }); return true;
    }
    if (request.method === "POST" && pathname === "/api/auth/signin") {
      rateLimit(request);
      const input = await readJson(request);
      const user = await store.authenticate(input.username, input.password);
      if (!user) throw httpError(401, "Username or password is incorrect.");
      const session = await store.createSession(user.id, Boolean(input.remember));
      setSessionCookie(request, response, session.token, session.maxAge);
      sendJson(response, 200, { signedIn: true, username: user.username, profileData: user.profileData }); return true;
    }
    if (request.method === "POST" && pathname === "/api/auth/signout") {
      await store.deleteSession(parseCookies(request)[sessionCookie]);
      clearSessionCookie(request, response);
      sendJson(response, 200, { signedIn: false }); return true;
    }
    if (request.method === "PUT" && pathname === "/api/auth/profile") {
      const user = await currentUser(request);
      if (!user) throw httpError(401, "Sign in required.");
      const input = await readJson(request);
      const updated = await store.updateProfile(user.id, input.profileData || {});
      sendJson(response, 200, { signedIn: true, username: updated.username, profileData: updated.profileData }); return true;
    }
    if (request.method === "DELETE" && pathname === "/api/auth/account") {
      const user = await currentUser(request);
      if (!user) throw httpError(401, "Sign in required.");
      const input = await readJson(request);
      if (String(input.confirmation || "").trim() !== "DELETE") throw httpError(400, "Type DELETE in all caps to confirm account deletion.");
      if (!(await store.verifyUserPassword(user.id, input.password))) throw httpError(401, "Enter your current password to delete the account.");
      await store.deleteAccount(user.id);
      clearSessionCookie(request, response);
      sendJson(response, 200, { ok: true }); return true;
    }
    if (request.method === "GET" && pathname === "/api/account/data") {
      const user = await currentUser(request);
      if (!user) throw httpError(401, "Sign in required.");
      sendJson(response, 200, { appData: await store.getAppData(user.id) }); return true;
    }
    if (request.method === "PUT" && pathname === "/api/account/data") {
      const user = await currentUser(request);
      if (!user) throw httpError(401, "Sign in required.");
      const input = await readJson(request);
      sendJson(response, 200, { appData: await store.updateAppData(user.id, input.appData || {}) }); return true;
    }
    return false;
  } catch (error) {
    sendJson(response, error.statusCode || 500, { error: error.statusCode ? error.message : "The server could not complete that request." });
    if (!error.statusCode) console.error(error);
    return true;
  }
}

async function serveStatic(response, pathname) {
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const safePath = normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, safePath);
  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = join(filePath, "index.html");
    response.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream", "Cache-Control": "no-store, max-age=0", ...securityHeaders });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", ...securityHeaders });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  if (url.pathname.startsWith("/api/") && await handleApi(request, response, url.pathname)) return;
  await serveStatic(response, url.pathname);
});
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") console.error(`Port ${port} is already in use.`);
  else console.error(error);
  process.exit(1);
});
server.listen(port, host, () => console.log(`AI Scouter is running at http://localhost:${port} (${store.persistent ? "PostgreSQL" : "temporary local accounts"})`));
