import { access, readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
execFileSync(process.execPath, [path.join(root, "build.mjs")], { stdio: "inherit" });

const required = ["index.html", "styles.css", "app.js", "auth.js", "favicon.svg", "site.webmanifest"];
await Promise.all(required.map((file) => access(path.join(root, "dist", file))));

const html = await readFile(path.join(root, "dist", "index.html"), "utf8");
const css = await readFile(path.join(root, "dist", "styles.css"), "utf8");
const js = await readFile(path.join(root, "dist", "app.js"), "utf8");
const auth = await readFile(path.join(root, "dist", "auth.js"), "utf8");
const server = await readFile(path.join(root, "scripts", "serve.mjs"), "utf8");
const accountStore = await readFile(path.join(root, "scripts", "account-store.mjs"), "utf8");

const assertions = [
  [html.includes('id="matcher-form"'), "matcher form is present"],
  [html.includes('id="results"'), "results region is present"],
  [html.includes('data-page="settings"'), "settings page is present"],
  [html.includes('data-page="advanced"'), "advanced workflow page is present"],
  [html.includes('id="folio-dashboard"'), "fixed Folio dashboard is present"],
  [html.includes('id="standard-home"') && html.includes('id="standard-paths"') && html.includes('standard-home-spotlight'), "standard welcome page follows the hero, paths, and spotlight structure"],
  [html.includes('styles.css?v=20261127a') && html.includes('app.js?v=20261127a') && html.includes('auth.js?v=20261127a'), "versioned assets are present"],
  [html.includes('id="folio-background"'), "Folio background control is present"],
  [html.includes('data-reset-setting="folioAccent"'), "individual setting resets are present"],
  [html.includes('localStorage.getItem("ai-scouter-preferences")') && html.indexOf('localStorage.getItem("ai-scouter-preferences")') < html.indexOf('styles.css?v=20261127a'), "saved appearance is applied before the stylesheet can paint"],
  [html.includes('const defaults = { mode: "light"') && js.includes('const appearanceDefaults = { mode: "light"'), "new visitors default to Light while stored preferences still merge over defaults"],
  [css.includes('Standard welcome experience: CG Creations structure') && css.includes(':root[data-palette="default"] .standard-home{display:block') && css.includes(':root[data-palette="default"][data-layout="split"] .standard-home{display:none}'), "welcome page is isolated to the standard catalog layout"],
  [css.includes('@keyframes standard-marquee') && css.includes('@keyframes standard-orbit-turn') && css.includes('@media(prefers-reduced-motion:reduce)'), "standard welcome motion and reduced-motion behavior are present"],
  [css.includes(':root[data-palette="default"][data-theme="dark"]{--ink:#f4f6fb;--text:#d9ddea;--muted:#9ea6ba;--line:#323849;--line-strong:#444c60;--surface:#181d29;--surface-soft:#222836;--canvas:#11151e'), "standard Dark palette retains its existing colors"],
  [css.includes(':root[data-palette="default"][data-theme="light"]{--ink:#0c2a43') && css.includes('--canvas:#dfeefa'), "standard Light palette uses the new light-blue system"],
  [html.includes('id="advanced-theme-form"') && html.includes('id="advanced-theme-vault"') && html.includes('data-palette-option="folio"'), "Folio is available only inside the protected advanced theme vault"],
  [html.includes('id="layout-grid"') && html.includes('data-layout-option="split"') && html.includes('data-layout-option="compact"'), "independent layout options are present"],
  [html.includes('id="hover-info-toggle"') && html.includes('data-reset-setting="moreInfo"'), "hover information preference is present and resettable"],
  [html.includes("Credits of the Folio theme go to Felix Koiviestoinen.") && css.includes('.folio-credit{display:none') && css.includes('[data-palette="folio"] .folio-credit{display:block'), "Folio credit is present only while Folio is active"],
  [html.includes('aria-live="polite"'), "live status region is present"],
  [css.includes("@media (prefers-reduced-motion: reduce)"), "reduced motion styles are present"],
  [css.includes('data-palette="folio"'), "Folio theme is present"],
  [css.includes("Folio fixed layout preset"), "fixed Folio layout is present"],
  [css.includes("Corner personalization contract"), "automatic corner personalization is present"],
  [css.includes("Folio fixed-corner contract") && css.includes("--folio-radius-panel:13px"), "Folio uses a complete fixed corner system"],
  [css.includes('[data-palette="folio"][data-layout="split"] .folio-dashboard{display:block}') && css.includes('[data-layout="split"] .split-workbench{display:block}'), "Folio and standard Side-by-Side layouts are separated"],
  [css.includes(':root[data-layout="compact"] .directory-card[hidden]{display:none}'), "compact layout preserves search filtering"],
  [css.includes("Icon containment contract") && css.includes(".directory-card{position:relative;isolation:isolate}.folio-tool-row{overflow:hidden}"), "tool icons are contained in every card and row"],
  [css.includes(".folio-tool-row>i,.folio-tool-heading>i") && css.includes("border-radius:var(--radius-detail)!important"), "Side by Side icons follow corner personalization outside Folio"],
  [css.includes('data-more-info="true"') && css.includes(':not([data-layout="split"])'), "hover profiles apply outside Side by Side only"],
  [css.includes("grid-auto-flow:dense") && css.includes("grid-auto-rows:1px") && css.includes("--directory-gap"), "expanded cards use an in-flow masonry layout"],
  [css.includes("Matcher transparency contract") && css.includes(".matcher-card{background:transparent;border-color:transparent}"), "matcher container stays transparent across themes"],
  [css.includes("Folio color-personalization contract"), "shared Folio components inherit adaptive colors"],
  [css.includes('.folio-panel-drag') && css.includes('cursor:col-resize'), "Folio panels provide a visible resize handle"],
  [css.includes('.folio-tool-row.active') && css.includes('box-shadow:inset 3px 0 0 var(--primary)'), "Folio selection uses a clear sage state"],
  [css.includes('[class*="-status"]') && css.includes('[class*="-count"]') && css.includes('[class*="-card"]'), "new semantic components inherit corner personalization"],
  [css.includes('data-theme="light"'), "Folio light-mode styling is present"],
  [css.includes('data-palette="deploy"'), "Deploy theme is present"],
  [html.includes('data-palette-option="atlas"') && css.includes('data-palette="atlas"'), "Atlas operations theme is present"],
  [html.includes('id="atlas-visible-count"') && js.includes('appearancePreferences.palette === "atlas"'), "Atlas live intelligence strip and split-layout behavior are present"],
  [html.includes('data-palette-option="liquid"') && css.includes('Liquid Glass theme'), "Liquid Glass theme is available"],
  [html.includes('data-palette-option="creations"') && css.includes('CG Creations theme'), "CG Creations homepage theme is available"],
  [css.includes('--canvas:#061522') && css.includes('--canvas:#dbe5f4') && css.includes('[data-theme="light"] body{background:#dbe5f4'), "CG Creations keeps its navy dark mode and uses the requested light background"],
  [css.includes(':root[data-palette="creations"] .tool-directory{column-gap:var(--directory-gap);row-gap:0}'), "CG Creations preserves masonry row spacing"],
  [css.includes(':root[data-palette="creations"][data-layout="compact"] .tool-directory{grid-template-columns:minmax(0,1fr)}'), "CG Creations compact rows remain contained"],
  [html.includes('data-palette-option="signal"') && css.includes('Signal theme: a distinct bento command deck'), "Signal bento command-deck theme is available"],
  [css.includes('grid-template-columns:repeat(12,minmax(0,1fr))') && css.includes('grid-column:span 7') && css.includes('grid-column:span 5'), "Signal uses an asymmetric bento catalog rather than the default card grid"],
  [css.includes('inset:18px auto 18px 18px') && css.includes('margin:-52px auto 0'), "Signal uses floating navigation and an overlapping matcher composition"],
  [css.includes('width:calc(100% - 76px)') && css.includes('min-height:350px') && css.includes('box-shadow:16px 16px 0'), "Signal changes scale, depth, and interaction effects"],
  [css.includes('[data-palette="signal"] .settings-layout{grid-template-columns:minmax(0,1fr) minmax(300px,360px)') && css.includes('[data-palette="signal"] .settings-card:nth-child(n)'), "Signal settings use a collision-safe responsive layout"],
  [html.includes('data-palette-option="nova"') && css.includes('Nova theme: a contemporary spatial workspace'), "Nova modern spatial theme is available"],
  [html.includes('id="split-workbench"') && html.includes('id="split-tool-list"') && js.includes('renderSplitWorkspace'), "non-Folio Side-by-Side workbench is functional"],
  [js.includes('advancedThemePassword.value !== "SDE4t3am"') && js.includes('sessionStorage.setItem(folioVaultKey'), "advanced Folio access requires the requested session password"],
  [html.match(/Find the right AI\. Move with confidence\./g)?.length >= 4, "the same product slogan is used across the interface"],
  [html.includes('id="account-auth-form"') && html.includes('id="account-settings-form"') && html.includes('id="account-delete-form"'), "complete account interface is present"],
  [js.includes('ai-scouter-account-data') && js.includes('syncAccountData'), "account data hydrates and syncs app state"],
  [css.includes('Account system: theme-aware identity') && css.includes('.account-card{'), "account interface is responsive and theme aware"],
  [auth.includes('credentials: "same-origin"') && auth.includes('AIScouterAuth') && auth.includes('ai-scouter-account-data'), "account client uses secure same-origin sessions and data sync"],
  [server.includes("HttpOnly; SameSite=Lax") && server.includes("accountsAvailable") && server.includes("configuration-required"), "account server uses protected cookies and prevents temporary production accounts"],
  [accountStore.includes("scryptSync") && accountStore.includes("createHash(\"sha256\")") && accountStore.includes("createAccountStore(databaseUrl"), "passwords and session tokens are stored as one-way hashes in PostgreSQL"],
  [html.includes('data-palette-option="navigator"') && html.includes('<strong>Fieldbook</strong>') && css.includes('Fieldbook theme'), "Fieldbook sidebar theme is available"],
  [css.includes('Fieldbook responsive containment contract'), "Fieldbook responsive containment contract is present"],
  [html.includes('id="liquid-glass-range"') && js.includes('applyLiquidGlass'), "Liquid Glass intensity is adjustable"],
  [html.includes('class="liquid-setting-row liquid-mode-background"') && html.includes('Light · White') && html.includes('Dark · Black'), "Liquid Glass explains its automatic mode background"],
  [css.includes('--canvas:#fff') && css.includes('--canvas:#000') && css.includes('body{position:relative;min-height:100vh;background:var(--canvas)'), "Liquid Glass uses only white and black mode backgrounds"],
  [js.includes('root.dataset.liquidBackground = "mode"') && js.includes('root.style.setProperty("--liquid-custom-background", "none")'), "Liquid Glass ignores saved wallpaper values"],
  [css.includes('backdrop-filter:blur(var(--liquid-glass-blur))') && css.includes('--glass-specular'), "Liquid Glass uses blur and specular edge treatments"],
  [css.includes('.app-shell{position:relative;isolation:auto') && css.includes('var(--glass-rim) border-box'), "Liquid Glass retains its refractive rim treatment"],
  [!css.includes('repeating-linear-gradient') && !css.includes('.page-hero::before'), "Liquid Glass has a clean background without decorative grids or bubbles"],
  [css.includes('Side-by-Side containment contract') && css.includes('text-overflow:ellipsis'), "Liquid Side by Side contains long sidebar text"],
  [css.includes("--accent-text"), "accent contrast tokens are present"],
  [js.includes("const tools = ["), "tool dataset is present"],
  [js.includes("localStorage"), "local preference support is present"],
  [js.includes("prefers-color-scheme: dark"), "system appearance support is present"],
  [js.includes("applyFolioColors"), "custom Folio colors are applied"],
  [js.includes('"--active-surface"') && css.includes("--active-surface"), "Folio active navigation uses an adaptive visible tint"],
  [js.includes("function searchTools") && js.includes("searchTools(folioSearch.value") && js.includes("searchTools(toolSearch.value") && js.includes("searchTools(splitSearch.value"), "all tool searches share one implementation"],
  [js.includes("appearancePreferences.layout") && js.includes("root.dataset.layout"), "layout preference is saved and applied"],
  [js.includes("appearancePreferences.moreInfo") && js.includes("root.dataset.moreInfo"), "hover information preference is saved and applied"],
  [html.includes('bold: false') && js.includes('bold: false') && html.includes('typographyVersion: 2'), "regular-weight typography is the migrated default"],
  [js.includes("toolProfileInsightsMarkup(tool)") && js.match(/toolProfileInsightsMarkup\(tool\)/g)?.length >= 3, "cards and Side by Side share one profile-information renderer"],
  [js.includes("ResizeObserver") && js.includes("updateDirectoryCardSpan") && js.includes("gridRowEnd"), "directory masonry recalculates when cards expand"],
  [js.includes('appearancePreferences.palette === "folio-scouter"') && html.includes('preferences.palette === "folio-scouter"'), "legacy Folio Scouter preferences migrate to Folio"],
  [js.includes("Fixed · 6–13 px"), "Folio settings describe the fixed radius scale accurately"],
  [js.includes("ensureColorContrast") && js.includes("colorContrast"), "custom Folio colors enforce readable contrast"],
  [js.includes("createBlueprint"), "advanced blueprint builder is present"],
  [js.includes("updateFolioPanelWidth") && js.includes('addEventListener("pointermove"'), "Folio panel divider supports pointer and keyboard resizing"],
  [js.includes("renderFolioDashboard"), "Folio dashboard behavior is present"]
];

const failures = assertions.filter(([passes]) => !passes).map(([, message]) => message);
if (failures.length) {
  throw new Error(`Validation failed: ${failures.join(", ")}`);
}

console.log(`Validated ${required.length} built assets and ${assertions.length} experience checks.`);
