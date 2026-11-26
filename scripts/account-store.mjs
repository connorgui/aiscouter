import crypto from "node:crypto";

const rememberedSessionMs = 1000 * 60 * 60 * 24 * 30;
const standardSessionMs = 1000 * 60 * 60 * 12;

export function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

export function validateCredentials(username, password) {
  const normalizedUsername = normalizeUsername(username);
  if (!/^[a-z0-9_-]{3,24}$/.test(normalizedUsername)) {
    throw httpError(400, "Username must be 3-24 characters using letters, numbers, dashes, or underscores.");
  }
  if (typeof password !== "string" || password.length < 8 || password.length > 72) {
    throw httpError(400, "Password must be between 8 and 72 characters.");
  }
  return { normalizedUsername, password };
}

export function sanitizeProfileData(input, username = "") {
  const source = input && typeof input === "object" ? input : {};
  const displayName = String(source.displayName || username).trim().slice(0, 40) || username;
  const avatarType = ["initials", "emoji", "photo"].includes(source.avatarType) ? source.avatarType : "initials";
  const avatarColor = /^#[0-9a-f]{6}$/i.test(String(source.avatarColor || "")) ? source.avatarColor : "#6677e8";
  let avatarValue = String(source.avatarValue || "").trim();
  if (avatarType === "initials") avatarValue = avatarValue.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase() || username.slice(0, 2).toUpperCase();
  if (avatarType === "emoji" && (!avatarValue || avatarValue.length > 12)) throw httpError(400, "Please choose a valid emoji avatar.");
  if (avatarType === "photo") {
    if (!/^data:image\/(?:png|jpeg|webp|gif);base64,/i.test(avatarValue)) throw httpError(400, "Photo avatars must be PNG, JPEG, WebP, or GIF images.");
    if (avatarValue.length > 320000) throw httpError(400, "Photo avatar is too large. Choose an image under 230 KB.");
  }
  return { displayName, avatarType, avatarValue, avatarColor };
}

export function sanitizeAppData(input) {
  const source = input && typeof input === "object" ? input : {};
  const preferences = source.preferences && typeof source.preferences === "object" && !Array.isArray(source.preferences)
    ? { ...source.preferences }
    : {};
  delete preferences.liquidBackgroundImage;
  delete preferences.liquidBackgroundName;
  const savedTools = Array.isArray(source.savedTools)
    ? [...new Set(source.savedTools.map(String).filter((id) => /^[a-z0-9-]{1,60}$/i.test(id)))].slice(0, 100)
    : [];
  const blueprints = Array.isArray(source.blueprints) ? source.blueprints.slice(0, 20) : [];
  const normalized = { preferences, savedTools, blueprints, updatedAt: new Date().toISOString() };
  if (JSON.stringify(normalized).length > 600000) throw httpError(413, "Account data is too large to sync.");
  return normalized;
}

export function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  return { salt, hash: crypto.scryptSync(password, salt, 64).toString("hex") };
}

function verifyPassword(password, salt, expectedHash) {
  const actual = Buffer.from(hashPassword(password, salt).hash, "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function sessionHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function publicUser(row) {
  return row ? { id: row.id, username: row.username, profileData: sanitizeProfileData(row.profile_data || row.profileData || {}, row.username) } : null;
}

export async function createAccountStore(databaseUrl = "") {
  if (databaseUrl) return createPostgresStore(databaseUrl);
  return createMemoryStore();
}

function createMemoryStore() {
  let nextId = 1;
  const users = new Map();
  const sessions = new Map();
  const api = {
    persistent: false,
    async createAccount(username, password, profileInput) {
      const { normalizedUsername } = validateCredentials(username, password);
      if (users.has(normalizedUsername)) throw httpError(409, "That username is already taken.");
      const { salt, hash } = hashPassword(password);
      const row = { id: nextId++, username: normalizedUsername, password_salt: salt, password_hash: hash, profile_data: sanitizeProfileData(profileInput, normalizedUsername), app_data: {} };
      users.set(normalizedUsername, row);
      return publicUser(row);
    },
    async authenticate(username, password) {
      const { normalizedUsername } = validateCredentials(username, password);
      const row = users.get(normalizedUsername);
      return row && verifyPassword(password, row.password_salt, row.password_hash) ? publicUser(row) : null;
    },
    async createSession(userId, remember) {
      const token = `${crypto.randomUUID()}${crypto.randomBytes(24).toString("hex")}`;
      const duration = remember ? rememberedSessionMs : standardSessionMs;
      sessions.set(sessionHash(token), { userId, expiresAt: Date.now() + duration });
      return { token, maxAge: remember ? Math.floor(duration / 1000) : null };
    },
    async userForSession(token) {
      const session = sessions.get(sessionHash(token || ""));
      if (!session || session.expiresAt <= Date.now()) return null;
      const row = [...users.values()].find((candidate) => candidate.id === session.userId);
      return publicUser(row);
    },
    async deleteSession(token) { sessions.delete(sessionHash(token || "")); },
    async updateProfile(userId, profileInput) {
      const row = [...users.values()].find((candidate) => candidate.id === userId);
      if (!row) throw httpError(404, "Account not found.");
      row.profile_data = sanitizeProfileData(profileInput, row.username);
      return publicUser(row);
    },
    async getAppData(userId) {
      const row = [...users.values()].find((candidate) => candidate.id === userId);
      return row?.app_data || {};
    },
    async updateAppData(userId, input) {
      const row = [...users.values()].find((candidate) => candidate.id === userId);
      if (!row) throw httpError(404, "Account not found.");
      row.app_data = sanitizeAppData(input);
      return row.app_data;
    },
    async verifyUserPassword(userId, password) {
      const row = [...users.values()].find((candidate) => candidate.id === userId);
      return Boolean(row && verifyPassword(password, row.password_salt, row.password_hash));
    },
    async deleteAccount(userId) {
      const row = [...users.values()].find((candidate) => candidate.id === userId);
      if (row) users.delete(row.username);
      for (const [key, session] of sessions) if (session.userId === userId) sessions.delete(key);
    }
  };
  return api;
}

async function createPostgresStore(databaseUrl) {
  const { Pool } = await import("pg");
  const pool = new Pool({ connectionString: databaseUrl, ssl: databaseUrl.includes("sslmode=disable") ? false : { rejectUnauthorized: false } });
  await pool.query(`
    CREATE TABLE IF NOT EXISTS scouter_users (
      id BIGSERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_salt TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      profile_data JSONB NOT NULL DEFAULT '{}'::jsonb,
      app_data JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS scouter_sessions (
      token_hash TEXT PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES scouter_users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    DELETE FROM scouter_sessions WHERE expires_at <= NOW();
  `);
  return {
    persistent: true,
    async createAccount(username, password, profileInput) {
      const { normalizedUsername } = validateCredentials(username, password);
      const { salt, hash } = hashPassword(password);
      const profile = sanitizeProfileData(profileInput, normalizedUsername);
      try {
        const result = await pool.query("INSERT INTO scouter_users (username,password_salt,password_hash,profile_data) VALUES ($1,$2,$3,$4::jsonb) RETURNING *", [normalizedUsername, salt, hash, JSON.stringify(profile)]);
        return publicUser(result.rows[0]);
      } catch (error) {
        if (error?.code === "23505") throw httpError(409, "That username is already taken.");
        throw error;
      }
    },
    async authenticate(username, password) {
      const { normalizedUsername } = validateCredentials(username, password);
      const result = await pool.query("SELECT * FROM scouter_users WHERE username=$1", [normalizedUsername]);
      const row = result.rows[0];
      return row && verifyPassword(password, row.password_salt, row.password_hash) ? publicUser(row) : null;
    },
    async createSession(userId, remember) {
      const token = `${crypto.randomUUID()}${crypto.randomBytes(24).toString("hex")}`;
      const duration = remember ? rememberedSessionMs : standardSessionMs;
      await pool.query("INSERT INTO scouter_sessions (token_hash,user_id,expires_at) VALUES ($1,$2,$3)", [sessionHash(token), userId, new Date(Date.now() + duration)]);
      return { token, maxAge: remember ? Math.floor(duration / 1000) : null };
    },
    async userForSession(token) {
      if (!token) return null;
      const result = await pool.query("SELECT u.* FROM scouter_sessions s JOIN scouter_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>NOW()", [sessionHash(token)]);
      return publicUser(result.rows[0]);
    },
    async deleteSession(token) { if (token) await pool.query("DELETE FROM scouter_sessions WHERE token_hash=$1", [sessionHash(token)]); },
    async updateProfile(userId, profileInput) {
      const current = await pool.query("SELECT username FROM scouter_users WHERE id=$1", [userId]);
      if (!current.rows[0]) throw httpError(404, "Account not found.");
      const profile = sanitizeProfileData(profileInput, current.rows[0].username);
      const result = await pool.query("UPDATE scouter_users SET profile_data=$2::jsonb,updated_at=NOW() WHERE id=$1 RETURNING *", [userId, JSON.stringify(profile)]);
      return publicUser(result.rows[0]);
    },
    async getAppData(userId) {
      const result = await pool.query("SELECT app_data FROM scouter_users WHERE id=$1", [userId]);
      return result.rows[0]?.app_data || {};
    },
    async updateAppData(userId, input) {
      const data = sanitizeAppData(input);
      await pool.query("UPDATE scouter_users SET app_data=$2::jsonb,updated_at=NOW() WHERE id=$1", [userId, JSON.stringify(data)]);
      return data;
    },
    async verifyUserPassword(userId, password) {
      const result = await pool.query("SELECT password_salt,password_hash FROM scouter_users WHERE id=$1", [userId]);
      const row = result.rows[0];
      return Boolean(row && typeof password === "string" && verifyPassword(password, row.password_salt, row.password_hash));
    },
    async deleteAccount(userId) { await pool.query("DELETE FROM scouter_users WHERE id=$1", [userId]); }
  };
}
