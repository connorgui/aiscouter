import { access, readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
execFileSync(process.execPath, [path.join(root, "build.mjs")], { stdio: "inherit" });

const required = ["index.html", "styles.css", "app.js", "favicon.svg", "site.webmanifest"];
await Promise.all(required.map((file) => access(path.join(root, "dist", file))));

const html = await readFile(path.join(root, "dist", "index.html"), "utf8");
const css = await readFile(path.join(root, "dist", "styles.css"), "utf8");
const js = await readFile(path.join(root, "dist", "app.js"), "utf8");

const assertions = [
  [html.includes('id="matcher-form"'), "matcher form is present"],
  [html.includes('id="results"'), "results region is present"],
  [html.includes('data-page="settings"'), "settings page is present"],
  [html.includes('data-page="advanced"'), "advanced workflow page is present"],
  [html.includes('id="folio-dashboard"'), "fixed Folio dashboard is present"],
  [html.includes('styles.css?v=20261116j'), "versioned stylesheet is present"],
  [html.includes('id="folio-background"'), "Folio background control is present"],
  [html.includes('data-reset-setting="folioAccent"'), "individual setting resets are present"],
  [html.includes('localStorage.getItem("ai-scouter-preferences")') && html.indexOf('localStorage.getItem("ai-scouter-preferences")') < html.indexOf('styles.css?v=20261116j'), "saved appearance is applied before the stylesheet can paint"],
  [html.includes('data-palette-option="folio"') && html.includes('<small>Folio Scouter</small>'), "AI-adapted Folio Scouter theme is available"],
  [html.includes('id="layout-grid"') && html.includes('data-layout-option="split"') && html.includes('data-layout-option="compact"'), "independent layout options are present"],
  [html.includes('id="hover-info-toggle"') && html.includes('data-reset-setting="moreInfo"'), "hover information preference is present and resettable"],
  [html.includes("Credits of the Folio theme go to Felix Koiviestoinen."), "Folio theme credit is present"],
  [html.includes('aria-live="polite"'), "live status region is present"],
  [css.includes("@media (prefers-reduced-motion: reduce)"), "reduced motion styles are present"],
  [css.includes('data-palette="folio"'), "Folio theme is present"],
  [css.includes("Folio fixed layout preset"), "fixed Folio layout is present"],
  [css.includes("Corner personalization contract"), "automatic corner personalization is present"],
  [css.includes("Folio fixed-corner contract") && css.includes("--folio-radius-panel:13px"), "Folio uses a complete fixed corner system"],
  [css.includes('data-layout="split"') && css.includes('data-layout="compact"'), "split and compact layouts are styled independently from themes"],
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
  [css.includes("--accent-text"), "accent contrast tokens are present"],
  [js.includes("const tools = ["), "tool dataset is present"],
  [js.includes("localStorage"), "local preference support is present"],
  [js.includes("prefers-color-scheme: dark"), "system appearance support is present"],
  [js.includes("applyFolioColors"), "custom Folio colors are applied"],
  [js.includes('"--active-surface"') && css.includes("--active-surface"), "Folio active navigation uses an adaptive visible tint"],
  [js.includes("function searchTools") && js.includes("searchTools(folioSearch.value") && js.includes("searchTools(toolSearch.value"), "all tool searches share one implementation"],
  [js.includes("appearancePreferences.layout") && js.includes("root.dataset.layout"), "layout preference is saved and applied"],
  [js.includes("appearancePreferences.moreInfo") && js.includes("root.dataset.moreInfo"), "hover information preference is saved and applied"],
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
