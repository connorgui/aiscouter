import { spawn } from "node:child_process";

const testPort = 8099;
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${testPort}`;
let localServer = null;
if (!process.env.TEST_BASE_URL) {
  localServer = spawn(process.execPath, ["scripts/serve.mjs"], { cwd: new URL("../", import.meta.url), env: { ...process.env, PORT: String(testPort), HOST: "127.0.0.1" }, stdio: ["ignore", "pipe", "inherit"] });
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Local account server did not start.")), 10000);
    localServer.stdout.on("data", (chunk) => { if (String(chunk).includes("AI Scouter is running")) { clearTimeout(timeout); resolve(); } });
    localServer.once("exit", (code) => reject(new Error(`Local account server exited with ${code}.`)));
  });
  process.once("exit", () => localServer?.kill());
}
const username = `qa_${Date.now().toString(36)}`;
const password = "AccountTest42!";
let cookie = "";

async function call(path, options = {}) {
  const response = await fetch(`${base}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}), ...(options.headers || {}) } });
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) cookie = setCookie.split(";")[0];
  const body = await response.json();
  if (!response.ok) throw new Error(`${options.method || "GET"} ${path}: ${response.status} ${body.error || "failed"}`);
  return { response, body, setCookie };
}

const signup = await call("/api/auth/signup", { method: "POST", body: JSON.stringify({ username, password, remember: false, profileData: { displayName: "QA Scout", avatarType: "initials", avatarValue: "QS", avatarColor: "#6677e8" } }) });
if (/Max-Age/i.test(signup.setCookie || "")) throw new Error("Non-remembered session must be a browser-session cookie.");
if (!(await call("/api/auth/me")).body.signedIn) throw new Error("Signup session was not authenticated.");
await call("/api/account/data", { method: "PUT", body: JSON.stringify({ appData: { preferences: { palette: "nova" }, savedTools: ["chatgpt", "claude"], blueprints: [{ name: "QA" }] } }) });
const synced = (await call("/api/account/data")).body.appData;
if (synced.preferences.palette !== "nova" || synced.savedTools.length !== 2) throw new Error("Account data did not persist.");
await call("/api/auth/profile", { method: "PUT", body: JSON.stringify({ profileData: { displayName: "Quality Scout", avatarType: "emoji", avatarValue: "🧭", avatarColor: "#0f9f89" } }) });
await call("/api/auth/signout", { method: "POST", body: "{}" });
if ((await call("/api/auth/me")).body.signedIn) throw new Error("Signout did not clear the session.");
cookie = "";
const signin = await call("/api/auth/signin", { method: "POST", body: JSON.stringify({ username, password, remember: true }) });
if (!/Max-Age=2592000/i.test(signin.setCookie || "")) throw new Error("Remember Me did not create a 30-day cookie.");
await call("/api/auth/account", { method: "DELETE", body: JSON.stringify({ confirmation: "DELETE", password }) });
if ((await call("/api/auth/me")).body.signedIn) throw new Error("Account deletion did not clear the session.");

console.log(`Account lifecycle passed for ${username}: signup, session, sync, profile, logout, remember, login, deletion.`);
localServer?.kill();
