const rememberedUsernameKey = "ai-scouter-remembered-username";
const rememberedChoiceKey = "ai-scouter-remember-me";
const avatarColors = ["#6677e8", "#0f9f89", "#ec6a8d", "#9a67ea", "#e57d36", "#2878c8"];
const state = { signedIn: false, username: null, profileData: null, mode: "signin", avatarMode: "initials", photoValue: "", syncing: false };
let syncTimer = 0;

const modal = document.querySelector("#account-modal");
const menu = document.querySelector("#account-menu");
const authView = document.querySelector("#account-auth-view");
const settingsView = document.querySelector("#account-settings-view");
const deleteView = document.querySelector("#account-delete-view");
const authForm = document.querySelector("#account-auth-form");
const settingsForm = document.querySelector("#account-settings-form");
const deleteForm = document.querySelector("#account-delete-form");
const usernameInput = document.querySelector("#account-username");
const passwordInput = document.querySelector("#account-password");
const rememberInput = document.querySelector("#account-remember");

function escapeText(value) { return String(value ?? ""); }

async function requestJson(url, options = {}) {
  const response = await fetch(url, { credentials: "same-origin", headers: { "Content-Type": "application/json", ...(options.headers || {}) }, ...options });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "The request could not be completed.");
  return payload;
}

function defaultProfile(username = "") {
  return { displayName: username, avatarType: "initials", avatarValue: username.slice(0, 2).toUpperCase(), avatarColor: avatarColors[0] };
}

function profile() { return { ...defaultProfile(state.username || ""), ...(state.profileData || {}) }; }

function paintAvatar(element, profileData = profile()) {
  if (!element) return;
  element.replaceChildren();
  element.style.background = profileData.avatarColor || avatarColors[0];
  element.style.color = "#fff";
  if (profileData.avatarType === "photo" && String(profileData.avatarValue).startsWith("data:image/")) {
    const image = document.createElement("img"); image.src = profileData.avatarValue; image.alt = ""; element.append(image); return;
  }
  element.textContent = profileData.avatarType === "emoji" ? profileData.avatarValue : (profileData.avatarValue || state.username?.slice(0, 2) || "S").toUpperCase();
}

function updateAccountUi() {
  const data = profile();
  document.querySelectorAll(".account-avatar").forEach((avatar) => paintAvatar(avatar, data));
  document.querySelectorAll("[data-account-label]").forEach((label) => { label.textContent = state.signedIn ? (data.displayName || state.username) : "Sign in"; });
  document.querySelectorAll("[data-account-subtitle]").forEach((label) => { label.textContent = state.signedIn ? `@${state.username}` : "Sync your saved tools"; });
  document.querySelectorAll("[data-sync-copy]").forEach((copy) => {
    if (copy.closest(".atlas-intel-strip")) copy.textContent = state.signedIn ? "Synced to your account" : "Stored locally in this browser";
    else if (copy.closest('[data-page="saved"]')) copy.textContent = state.signedIn ? "Your shortlist is synced to your signed-in account." : "Your shortlist stays in this browser and can be changed anytime.";
    else copy.textContent = state.signedIn ? "Appearance preferences sync to your signed-in account and apply immediately." : "Appearance preferences are saved in this browser and apply immediately across every page.";
  });
  document.querySelector("#account-menu-name").textContent = data.displayName || state.username || "AI Scouter user";
  document.documentElement.dataset.account = state.signedIn ? "signed-in" : "signed-out";
  window.dispatchEvent(new CustomEvent("ai-scouter-auth-change", { detail: { ...state, profileData: data } }));
}

function setView(view) {
  authView.hidden = view !== "auth";
  settingsView.hidden = view !== "settings";
  deleteView.hidden = view !== "delete";
}

function openModal(view = "auth") {
  menu.hidden = true;
  setView(view);
  modal.hidden = false;
  document.body.classList.add("account-open");
  setTimeout(() => modal.querySelector("input:not([hidden])")?.focus(), 0);
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("account-open");
  ["#account-auth-message", "#account-settings-message", "#account-delete-message"].forEach((selector) => { document.querySelector(selector).textContent = ""; });
}

function setAuthMode(mode) {
  state.mode = mode;
  const signup = mode === "signup";
  document.querySelectorAll("[data-auth-mode]").forEach((button) => { const active = button.dataset.authMode === mode; button.classList.toggle("active", active); button.setAttribute("aria-selected", String(active)); });
  document.querySelector("#account-title").textContent = signup ? "Create your workspace." : "Welcome back.";
  document.querySelector("#account-copy").textContent = signup ? "Create an account to carry your AI toolkit across devices." : "Sign in to sync your saved tools and appearance.";
  document.querySelector("#account-signup-fields").hidden = !signup;
  authForm.querySelector(".account-primary span").textContent = signup ? "Create account" : "Sign in";
  passwordInput.autocomplete = signup ? "new-password" : "current-password";
  document.querySelector("#account-auth-message").textContent = "";
}

function localAppData() {
  let preferences = {}, savedTools = [], blueprints = [];
  try { preferences = JSON.parse(localStorage.getItem("ai-scouter-preferences") || "{}"); } catch {}
  try { savedTools = JSON.parse(localStorage.getItem("ai-scouter-saved") || "[]"); } catch {}
  try { blueprints = JSON.parse(localStorage.getItem("ai-scouter-blueprints") || "[]"); } catch {}
  return { preferences, savedTools, blueprints };
}

function applyAccountData(data) {
  if (!data || typeof data !== "object") return;
  if (data.preferences) localStorage.setItem("ai-scouter-preferences", JSON.stringify(data.preferences));
  if (Array.isArray(data.savedTools)) localStorage.setItem("ai-scouter-saved", JSON.stringify(data.savedTools));
  if (Array.isArray(data.blueprints)) localStorage.setItem("ai-scouter-blueprints", JSON.stringify(data.blueprints));
  window.dispatchEvent(new CustomEvent("ai-scouter-account-data", { detail: data }));
}

async function loadAccountData() {
  if (!state.signedIn) return;
  const payload = await requestJson("/api/account/data");
  const remote = payload.appData || {};
  if (Object.keys(remote).length === 0) await syncAppData(true);
  else applyAccountData(remote);
}

async function syncAppData(immediate = false) {
  clearTimeout(syncTimer);
  if (!state.signedIn) return;
  if (!immediate) { syncTimer = setTimeout(() => syncAppData(true), 450); return; }
  if (state.syncing) return;
  state.syncing = true;
  try { await requestJson("/api/account/data", { method: "PUT", body: JSON.stringify({ appData: localAppData() }) }); }
  catch (error) { console.warn("Account sync paused:", error.message); }
  finally { state.syncing = false; }
}

async function refreshAuth() {
  try {
    const payload = await requestJson("/api/auth/me");
    state.signedIn = Boolean(payload.signedIn); state.username = payload.username; state.profileData = payload.profileData;
    updateAccountUi();
    if (state.signedIn) await loadAccountData();
  } catch { state.signedIn = false; updateAccountUi(); }
}

function openSettings() {
  const data = profile(); state.avatarMode = data.avatarType; state.photoValue = data.avatarType === "photo" ? data.avatarValue : "";
  document.querySelector("#account-settings-username").textContent = `@${state.username}`;
  document.querySelector("#account-settings-display-name").value = data.displayName || state.username;
  document.querySelector("#account-avatar-initials").value = data.avatarType === "initials" ? data.avatarValue : state.username.slice(0, 2).toUpperCase();
  document.querySelector("#account-avatar-color").value = data.avatarColor || avatarColors[0];
  document.querySelector("#account-avatar-emoji").value = data.avatarType === "emoji" ? data.avatarValue : "✨";
  syncAvatarPanels(); updateSettingsPreview(); openModal("settings");
}

function editorProfile() {
  const base = { displayName: document.querySelector("#account-settings-display-name").value.trim() || state.username, avatarType: state.avatarMode, avatarColor: document.querySelector("#account-avatar-color").value };
  if (state.avatarMode === "emoji") return { ...base, avatarValue: document.querySelector("#account-avatar-emoji").value.trim() || "✨" };
  if (state.avatarMode === "photo") return { ...base, avatarValue: state.photoValue };
  return { ...base, avatarValue: document.querySelector("#account-avatar-initials").value.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase() || state.username.slice(0, 2).toUpperCase() };
}

function syncAvatarPanels() {
  document.querySelectorAll("[data-avatar-mode]").forEach((button) => button.classList.toggle("active", button.dataset.avatarMode === state.avatarMode));
  document.querySelectorAll("[data-avatar-panel]").forEach((panel) => { panel.hidden = panel.dataset.avatarPanel !== state.avatarMode; });
}
function updateSettingsPreview() { paintAvatar(document.querySelector("#account-avatar-preview .account-avatar"), editorProfile()); }

document.querySelectorAll(".account-trigger").forEach((button) => button.addEventListener("click", (event) => {
  event.stopPropagation();
  if (!state.signedIn) { setAuthMode("signin"); openModal("auth"); return; }
  menu.hidden = !menu.hidden;
}));
document.addEventListener("click", (event) => { if (!event.target.closest("#account-menu") && !event.target.closest(".account-trigger")) menu.hidden = true; });
document.querySelector(".account-backdrop").addEventListener("click", closeModal);
document.querySelector(".account-close").addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeModal(); });
document.querySelectorAll("[data-auth-mode]").forEach((button) => button.addEventListener("click", () => setAuthMode(button.dataset.authMode)));

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = document.querySelector("#account-auth-message"); message.textContent = "";
  const username = usernameInput.value.trim(); const password = passwordInput.value; const remember = rememberInput.checked;
  const input = { username, password, remember };
  if (state.mode === "signup") input.profileData = { displayName: document.querySelector("#account-display-name").value.trim() || username, avatarType: "initials", avatarValue: username.slice(0, 2).toUpperCase(), avatarColor: document.querySelector("#account-signup-color").value };
  try {
    const payload = await requestJson(`/api/auth/${state.mode}`, { method: "POST", body: JSON.stringify(input) });
    if (remember) { localStorage.setItem(rememberedChoiceKey, "true"); localStorage.setItem(rememberedUsernameKey, username); }
    else { localStorage.removeItem(rememberedChoiceKey); localStorage.removeItem(rememberedUsernameKey); }
    state.signedIn = true; state.username = payload.username; state.profileData = payload.profileData; updateAccountUi(); await loadAccountData(); closeModal();
    window.dispatchEvent(new CustomEvent("ai-scouter-toast", { detail: `Signed in as ${payload.username}` }));
  } catch (error) { message.textContent = error.message; }
});

document.querySelector("#account-settings-button").addEventListener("click", openSettings);
document.querySelector("#account-logout-button").addEventListener("click", async () => {
  try { await requestJson("/api/auth/signout", { method: "POST", body: "{}" }); } catch {}
  state.signedIn = false; state.username = null; state.profileData = null; menu.hidden = true; updateAccountUi();
  window.dispatchEvent(new CustomEvent("ai-scouter-toast", { detail: "Signed out. Browser data is still available." }));
});

document.querySelectorAll("[data-avatar-mode]").forEach((button) => button.addEventListener("click", () => { state.avatarMode = button.dataset.avatarMode; syncAvatarPanels(); updateSettingsPreview(); }));
["#account-settings-display-name", "#account-avatar-initials", "#account-avatar-color", "#account-avatar-emoji"].forEach((selector) => document.querySelector(selector).addEventListener("input", updateSettingsPreview));
document.querySelector("#account-avatar-photo").addEventListener("change", (event) => {
  const file = event.target.files?.[0]; const message = document.querySelector("#account-settings-message"); message.textContent = "";
  if (!file) return;
  if (file.size > 230000) { message.textContent = "Choose an image smaller than 230 KB."; event.target.value = ""; return; }
  const reader = new FileReader(); reader.onload = () => { state.photoValue = String(reader.result); updateSettingsPreview(); }; reader.readAsDataURL(file);
});

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault(); const message = document.querySelector("#account-settings-message"); message.textContent = "";
  try { const payload = await requestJson("/api/auth/profile", { method: "PUT", body: JSON.stringify({ profileData: editorProfile() }) }); state.profileData = payload.profileData; updateAccountUi(); message.textContent = "Profile saved."; message.classList.add("success"); }
  catch (error) { message.classList.remove("success"); message.textContent = error.message; }
});
document.querySelector("#account-delete-open").addEventListener("click", () => openModal("delete"));
document.querySelector("#account-delete-cancel").addEventListener("click", openSettings);
deleteForm.addEventListener("submit", async (event) => {
  event.preventDefault(); const message = document.querySelector("#account-delete-message"); message.textContent = "";
  try {
    await requestJson("/api/auth/account", { method: "DELETE", body: JSON.stringify({ confirmation: document.querySelector("#account-delete-confirmation").value, password: document.querySelector("#account-delete-password").value }) });
    state.signedIn = false; state.username = null; state.profileData = null; closeModal(); updateAccountUi();
    window.dispatchEvent(new CustomEvent("ai-scouter-toast", { detail: "Account deleted. Local browser data was kept." }));
  } catch (error) { message.textContent = error.message; }
});

rememberInput.checked = localStorage.getItem(rememberedChoiceKey) === "true";
if (rememberInput.checked) usernameInput.value = localStorage.getItem(rememberedUsernameKey) || "";
setAuthMode("signin");
window.AIScouterAuth = { syncAppData, refresh: refreshAuth, getState: () => ({ ...state }) };
refreshAuth();
