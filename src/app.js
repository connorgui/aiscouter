const tools = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    mark: "CG",
    type: "Generalist",
    group: "words",
    color: "#c9ff53",
    url: "https://chatgpt.com/",
    tagline: "The flexible all-rounder for mixed, everyday work.",
    description: "A strong default when your task crosses writing, research, data, images, and general problem-solving.",
    watch: "A broad feature set can be more than you need for a narrow specialist task. Verify important facts and sources.",
    categories: { writing: 8, coding: 8, research: 8, data: 9, image: 8, video: 4, learning: 9, audio: 6 },
    priorities: { quality: 9, speed: 8, sources: 7, simple: 9 },
    keywords: ["plan", "brainstorm", "analyze", "spreadsheet", "general", "mixed", "presentation", "strategy", "help"],
    strengths: ["Handles mixed-format tasks in one conversation", "Useful for analysis, iteration, and structured outputs", "Good starting point when the task is still taking shape"]
  },
  {
    id: "claude",
    name: "Claude",
    mark: "CL",
    type: "Reasoning + writing",
    group: "words",
    color: "#ff9a76",
    url: "https://claude.ai/",
    tagline: "A thoughtful partner for writing, analysis, and code.",
    description: "Well suited to polished prose, dense documents, careful reasoning, and sustained work across a codebase.",
    watch: "For live or fast-changing facts, use its available search features and inspect the original sources yourself.",
    categories: { writing: 10, coding: 9, research: 7, data: 7, image: 3, video: 2, learning: 8, audio: 2 },
    priorities: { quality: 10, speed: 7, sources: 6, simple: 8 },
    keywords: ["rewrite", "article", "voice", "document", "pdf", "essay", "brief", "codebase", "review", "edit"],
    strengths: ["Strong long-form writing and editorial judgment", "Comfortable with dense source documents", "Useful for coding, review, and complex reasoning"]
  },
  {
    id: "gemini",
    name: "Gemini",
    mark: "GE",
    type: "Multimodal generalist",
    group: "words",
    color: "#8ea4ff",
    url: "https://gemini.google.com/",
    tagline: "A multimodal generalist with a natural Google workflow fit.",
    description: "A good choice for research and creation that mixes files, media, and tools in the Google ecosystem.",
    watch: "Feature availability can vary by account, region, and Google Workspace configuration.",
    categories: { writing: 8, coding: 8, research: 9, data: 8, image: 8, video: 7, learning: 8, audio: 7 },
    priorities: { quality: 9, speed: 8, sources: 8, simple: 8 },
    keywords: ["google", "gmail", "drive", "docs", "youtube", "multimodal", "video", "slides"],
    strengths: ["Works naturally with mixed media and files", "Strong fit for research-heavy workflows", "Convenient if your work already lives in Google tools"]
  },
  {
    id: "perplexity",
    name: "Perplexity",
    mark: "PX",
    type: "Answer engine",
    group: "words",
    color: "#75e5d4",
    url: "https://www.perplexity.ai/",
    tagline: "Fast web research with visible citations.",
    description: "Best when the job starts with current information, source discovery, comparison, or a fact-checked brief.",
    watch: "Citations make checking easier, not optional. Open the sources and confirm they actually support the claim.",
    categories: { writing: 6, coding: 5, research: 10, data: 6, image: 2, video: 2, learning: 8, audio: 2 },
    priorities: { quality: 8, speed: 9, sources: 10, simple: 9 },
    keywords: ["current", "latest", "sources", "cited", "compare", "competitor", "market", "news", "find", "research"],
    strengths: ["Built around web search and inline citations", "Fast for source discovery and current questions", "Good for comparison tables and research starting points"]
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    mark: "GH",
    type: "Coding agent",
    group: "build",
    color: "#b5a3ff",
    url: "https://github.com/features/copilot",
    tagline: "Coding help that stays close to your repository.",
    description: "A practical fit for writing, explaining, debugging, and reviewing code inside the IDE and GitHub workflow.",
    watch: "Generated code still needs review, tests, and security checks—especially around dependencies, auth, and data handling.",
    categories: { writing: 3, coding: 10, research: 3, data: 6, image: 1, video: 1, learning: 6, audio: 1 },
    priorities: { quality: 9, speed: 9, sources: 4, simple: 7 },
    keywords: ["repo", "repository", "github", "bug", "debug", "function", "api", "website", "app", "refactor", "test"],
    strengths: ["Contextual help inside the coding workflow", "Useful from inline suggestions through agentic tasks", "Keeps implementation close to the repository and review loop"]
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    mark: "NB",
    type: "Source notebook",
    group: "words",
    color: "#ffdc5e",
    url: "https://notebooklm.google.com/",
    tagline: "Learn and synthesize from the sources you choose.",
    description: "Excellent for studying, comparing documents, building a source-grounded guide, or turning material into an audio overview.",
    watch: "Its answers reflect the sources you provide. Weak, biased, or incomplete source material will shape the result.",
    categories: { writing: 7, coding: 3, research: 9, data: 5, image: 2, video: 4, learning: 10, audio: 7 },
    priorities: { quality: 8, speed: 7, sources: 10, simple: 8 },
    keywords: ["study", "learn", "notes", "sources", "class", "exam", "papers", "interviews", "summarize", "podcast"],
    strengths: ["Grounds the conversation in your source set", "Great for studying and comparing documents", "Can turn source material into useful overview formats"]
  },
  {
    id: "midjourney",
    name: "Midjourney",
    mark: "MJ",
    type: "Image generator",
    group: "media",
    color: "#ffb8d1",
    url: "https://www.midjourney.com/",
    tagline: "High-impact visual exploration and art direction.",
    description: "A specialist choice for concept art, moodboards, stylized scenes, and rapid exploration of a visual direction.",
    watch: "Text accuracy, precise brand layouts, and repeatable production constraints may need extra iteration or another design tool.",
    categories: { writing: 1, coding: 1, research: 1, data: 1, image: 10, video: 5, learning: 2, audio: 1 },
    priorities: { quality: 10, speed: 7, sources: 1, simple: 7 },
    keywords: ["illustration", "concept", "moodboard", "art", "photoreal", "poster", "visual", "brand", "style"],
    strengths: ["Strong visual style exploration", "Useful image and style references", "Fast route from a rough idea to multiple directions"]
  },
  {
    id: "runway",
    name: "Runway",
    mark: "RW",
    type: "Video studio",
    group: "media",
    color: "#7af29d",
    url: "https://runwayml.com/",
    tagline: "A focused creative studio for generated video.",
    description: "Built for moving-image workflows such as text-to-video, image-to-video, visual iteration, and AI-assisted editing.",
    watch: "Video generation is iterative and can use credits quickly. Plan shots, references, and acceptance criteria before generating.",
    categories: { writing: 1, coding: 1, research: 1, data: 1, image: 6, video: 10, learning: 2, audio: 6 },
    priorities: { quality: 10, speed: 6, sources: 1, simple: 7 },
    keywords: ["video", "film", "clip", "motion", "animate", "b-roll", "scene", "storyboard", "camera"],
    strengths: ["Purpose-built for generative video workflows", "Supports visual references and iterative creation", "Combines generation with practical editing tools"]
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    mark: "EL",
    type: "Voice + audio",
    group: "media",
    color: "#ff805d",
    url: "https://elevenlabs.io/",
    tagline: "Natural speech, voiceovers, and audio localization.",
    description: "A specialist for text-to-speech, narration, dubbing, and voice-led content where audio quality matters.",
    watch: "Use only voices and material you have the right and consent to use. Clearly label synthetic audio when context calls for it.",
    categories: { writing: 2, coding: 1, research: 1, data: 1, image: 1, video: 6, learning: 5, audio: 10 },
    priorities: { quality: 10, speed: 8, sources: 1, simple: 8 },
    keywords: ["voice", "voiceover", "narrate", "speech", "dub", "podcast", "audiobook", "sound", "audio"],
    strengths: ["Specialized text-to-speech and voice workflows", "Useful for narration and localization", "Fast route from a script to polished spoken audio"]
  },
  {
    id: "cursor",
    name: "Cursor",
    mark: "CU",
    type: "AI code editor",
    group: "build",
    color: "#d6d7db",
    url: "https://cursor.com/",
    tagline: "An AI-first editor for working across a codebase.",
    description: "A focused coding environment for asking questions about a repository, editing multiple files, and moving from a request to tested code.",
    watch: "Review every change and run the project tests. Repository context helps, but it does not guarantee correct or secure code.",
    categories: { writing: 2, coding: 10, research: 3, data: 6, image: 1, video: 1, learning: 6, audio: 1 },
    priorities: { quality: 9, speed: 9, sources: 3, simple: 7 },
    keywords: ["codebase", "editor", "ide", "repository", "refactor", "debug", "website", "app", "terminal"],
    strengths: ["Understands code in repository context", "Useful for multi-file edits and refactors", "Keeps coding and AI assistance in one workspace"]
  },
  {
    id: "grammarly",
    name: "Grammarly",
    mark: "GR",
    type: "Writing assistant",
    group: "words",
    color: "#79e0c4",
    url: "https://www.grammarly.com/ai-writing-assistant",
    tagline: "Polish everyday writing where you already work.",
    description: "Useful for revising tone, clarity, grammar, and structure across emails, reports, articles, and other day-to-day writing.",
    watch: "Treat suggestions as editorial options. Keep intentional voice and verify specialized claims or terminology.",
    categories: { writing: 10, coding: 2, research: 3, data: 2, image: 1, video: 1, learning: 6, audio: 1 },
    priorities: { quality: 8, speed: 9, sources: 3, simple: 10 },
    keywords: ["grammar", "rewrite", "tone", "email", "report", "clarity", "proofread", "edit"],
    strengths: ["Works well for focused revisions", "Helpful tone and clarity suggestions", "Fits into common writing surfaces"]
  },
  {
    id: "canva",
    name: "Canva Magic Studio",
    mark: "CA",
    type: "Design suite",
    group: "media",
    color: "#8edff2",
    url: "https://www.canva.com/magic-studio/",
    tagline: "Accessible AI-assisted design for everyday content.",
    description: "A practical choice for presentations, social graphics, marketing assets, and visual content that needs templates and editing in one place.",
    watch: "Template convenience can make work look generic. Apply your own hierarchy, brand rules, and final accessibility checks.",
    categories: { writing: 5, coding: 1, research: 2, data: 4, image: 9, video: 8, learning: 5, audio: 4 },
    priorities: { quality: 8, speed: 9, sources: 2, simple: 10 },
    keywords: ["presentation", "slides", "social", "graphic", "design", "template", "marketing", "poster"],
    strengths: ["Combines generation with familiar design tools", "Strong library of layouts and templates", "Easy path from idea to shareable asset"]
  },
  {
    id: "firefly",
    name: "Adobe Firefly",
    mark: "AF",
    type: "Creative generation",
    group: "media",
    color: "#ff907a",
    url: "https://www.adobe.com/products/firefly.html",
    tagline: "Generative images, video, audio, and vectors for creative work.",
    description: "A broad creative option for generating and refining visual assets, especially when the workflow already uses Adobe tools.",
    watch: "Confirm the terms and model used for the exact asset you create, then review output for brand and rights requirements.",
    categories: { writing: 2, coding: 1, research: 1, data: 1, image: 10, video: 8, learning: 2, audio: 6 },
    priorities: { quality: 9, speed: 8, sources: 1, simple: 8 },
    keywords: ["adobe", "photoshop", "vector", "image", "graphic", "campaign", "design", "video"],
    strengths: ["Covers several creative media formats", "Fits Adobe-centered workflows", "Useful for generation and controlled editing"]
  },
  {
    id: "suno",
    name: "Suno",
    mark: "SU",
    type: "Music generator",
    group: "media",
    color: "#a98bff",
    url: "https://suno.com/",
    tagline: "Turn a musical idea or description into a complete song.",
    description: "A specialist for exploring song ideas, arrangements, genres, lyrics, and music-led creative concepts.",
    watch: "Review current usage rights before publishing or commercial use, and do not imitate living artists or use material you do not control.",
    categories: { writing: 4, coding: 1, research: 1, data: 1, image: 1, video: 5, learning: 3, audio: 10 },
    priorities: { quality: 9, speed: 8, sources: 1, simple: 9 },
    keywords: ["song", "music", "melody", "lyrics", "instrumental", "jingle", "soundtrack", "genre"],
    strengths: ["Fast exploration of complete song ideas", "Works from plain-language creative direction", "Useful for demos, concepts, and musical iteration"]
  },
  {
    id: "descript",
    name: "Descript",
    mark: "DE",
    type: "Audio + video editor",
    group: "media",
    color: "#f0e26b",
    url: "https://www.descript.com/",
    tagline: "Edit recorded audio and video by editing the transcript.",
    description: "A strong production tool for podcasts, interviews, tutorials, and talking-head video where text-based editing saves time.",
    watch: "Automated transcription and edits still need a human pass for names, meaning, timing, and natural delivery.",
    categories: { writing: 5, coding: 1, research: 2, data: 1, image: 3, video: 9, learning: 4, audio: 10 },
    priorities: { quality: 8, speed: 9, sources: 2, simple: 9 },
    keywords: ["podcast", "interview", "transcript", "edit", "recording", "captions", "tutorial", "filler"],
    strengths: ["Text-based editing for recorded media", "Combines transcription and production", "Good for repurposing long recordings"]
  },
  {
    id: "synthesia",
    name: "Synthesia",
    mark: "SY",
    type: "Presenter video",
    group: "media",
    color: "#8cd1ff",
    url: "https://www.synthesia.io/",
    tagline: "Create presenter-led videos without a camera setup.",
    description: "Best suited to training, onboarding, internal communication, and structured explainers built from a script.",
    watch: "Use avatars and voices responsibly, disclose synthetic presenters where appropriate, and confirm consent for custom likenesses.",
    categories: { writing: 4, coding: 1, research: 1, data: 2, image: 4, video: 10, learning: 7, audio: 7 },
    priorities: { quality: 8, speed: 8, sources: 1, simple: 8 },
    keywords: ["training", "onboarding", "avatar", "presenter", "explainer", "course", "internal", "localize"],
    strengths: ["Purpose-built for presenter-led video", "Useful for repeatable training content", "Supports script-first production"]
  },
  {
    id: "zapier",
    name: "Zapier",
    mark: "ZA",
    type: "AI automation",
    group: "build",
    color: "#ff9f66",
    url: "https://zapier.com/ai",
    tagline: "Connect AI steps to the apps your work already uses.",
    description: "A no-code option for turning repeatable decisions, summaries, classifications, and handoffs into connected workflows.",
    watch: "Start with low-risk actions. Add approval steps, test edge cases, and prevent private information from flowing to the wrong service.",
    categories: { writing: 5, coding: 6, research: 4, data: 9, image: 3, video: 3, learning: 3, audio: 3 },
    priorities: { quality: 7, speed: 9, sources: 3, simple: 8 },
    keywords: ["automate", "automation", "workflow", "apps", "trigger", "email", "crm", "classify", "handoff"],
    strengths: ["Connects AI to repeatable business processes", "Works across many common applications", "Useful for no-code prototypes and handoffs"]
  }
];

const form = document.querySelector("#matcher-form");
const taskInput = document.querySelector("#task");
const characterCount = document.querySelector("#character-count");
const taskError = document.querySelector("#task-error");
const results = document.querySelector("#results");
const primaryResult = document.querySelector("#primary-result");
const alternativeGrid = document.querySelector("#alternative-grid");
const privacyAlert = document.querySelector("#privacy-alert");
const directory = document.querySelector("#tool-directory");
const toast = document.querySelector("#toast");
const toolSearch = document.querySelector("#tool-search");
const toolCount = document.querySelector("#tool-count");
const toolDialog = document.querySelector("#tool-dialog");
const dialogContent = document.querySelector("#dialog-content");
const savedDirectory = document.querySelector("#saved-directory");
const savedEmpty = document.querySelector("#saved-empty");
const savedCount = document.querySelector("#saved-count");
const comparePicker = document.querySelector("#compare-picker");
const compareOutput = document.querySelector("#compare-output");
const advancedBuilder = document.querySelector("#advanced-builder");
const blueprintEmpty = document.querySelector("#blueprint-empty");
const blueprintOutput = document.querySelector("#blueprint-output");
const appearanceStatus = document.querySelector("#appearance-status");
const radiusRange = document.querySelector("#radius-range");
const radiusOutput = document.querySelector("#radius-output");
const boldToggle = document.querySelector("#bold-toggle");
const boldLabel = document.querySelector("#bold-label");
const hoverInfoToggle = document.querySelector("#hover-info-toggle");
const hoverInfoLabel = document.querySelector("#hover-info-label");
const cornerSettings = document.querySelector("#corner-settings");
const typeSettings = document.querySelector("#type-settings");
const folioColorSetting = document.querySelector("#folio-color-setting");
const folioAccent = document.querySelector("#folio-accent");
const folioColorValue = document.querySelector("#folio-color-value");
const folioBackground = document.querySelector("#folio-background");
const folioBackgroundValue = document.querySelector("#folio-background-value");
const liquidSettings = document.querySelector("#liquid-settings");
const liquidGlassRange = document.querySelector("#liquid-glass-range");
const liquidGlassOutput = document.querySelector("#liquid-glass-output");
const liquidBackgroundGrid = document.querySelector("#liquid-background-grid");
const liquidBackgroundStatus = document.querySelector("#liquid-background-status");
const liquidBackgroundUpload = document.querySelector("#liquid-background-upload");
const liquidBackgroundClear = document.querySelector("#liquid-background-clear");
const liquidTint = document.querySelector("#liquid-tint");
const liquidTintValue = document.querySelector("#liquid-tint-value");
const folioSearch = document.querySelector("#folio-search");
const folioToolList = document.querySelector("#folio-tool-list");
const folioToolDetail = document.querySelector("#folio-tool-detail");
const folioCount = document.querySelector("#folio-count");
const folioPanels = document.querySelector("#folio-panels");
const folioPanelRange = document.querySelector("#folio-panel-range");
const folioPanelValue = document.querySelector("#folio-panel-value");
const folioPanelDrag = document.querySelector("#folio-panel-drag");
const folioModeToggle = document.querySelector("#folio-mode-toggle");
const atlasVisibleCount = document.querySelector("#atlas-visible-count");
const atlasCoverageLabel = document.querySelector("#atlas-coverage-label");
const atlasActiveTool = document.querySelector("#atlas-active-tool");
const atlasActiveType = document.querySelector("#atlas-active-type");
const atlasSavedCount = document.querySelector("#atlas-saved-count");
const systemColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
let activeDirectoryFilter = "all";
let activeFolioFilter = "all";
let selectedFolioToolId = "chatgpt";
let savedToolIds = new Set(JSON.parse(localStorage.getItem("ai-scouter-saved") || "[]"));
let comparedToolIds = ["chatgpt", "claude"];
const appearanceDefaults = { mode: "system", palette: "default", layout: "catalog", radius: 18, bold: true, moreInfo: false, folioAccent: "#afca7d", folioBackground: "#0f1711", folioLightBackground: "#f7f8f5", liquidGlass: 46, liquidBackground: "aurora", liquidBackgroundImage: "", liquidBackgroundName: "", liquidTint: "#5ab4ff" };
let appearancePreferences = { ...appearanceDefaults };
const isFolioPalette = (palette) => palette === "folio";
const isLiquidPalette = (palette) => palette === "liquid";

try {
  const storedPreferences = JSON.parse(localStorage.getItem("ai-scouter-preferences") || "{}");
  appearancePreferences = { ...appearanceDefaults, ...storedPreferences };
  if (String(appearancePreferences.folioLightBackground).toLowerCase() === "#fbfcf8") appearancePreferences.folioLightBackground = appearanceDefaults.folioLightBackground;
  if (appearancePreferences.palette === "folio-scouter") appearancePreferences.palette = "folio";
  if (!("layout" in storedPreferences)) appearancePreferences.layout = isFolioPalette(storedPreferences.palette) ? "split" : "catalog";
  const storedGlassLevel = Number(appearancePreferences.liquidGlass);
  appearancePreferences.liquidGlass = Number.isFinite(storedGlassLevel) ? Math.max(0, Math.min(100, storedGlassLevel)) : appearanceDefaults.liquidGlass;
  if (!Object.prototype.hasOwnProperty.call({ aurora: true, coast: true, orchid: true, midnight: true }, appearancePreferences.liquidBackground)) appearancePreferences.liquidBackground = appearanceDefaults.liquidBackground;
  if (!/^#[0-9a-f]{6}$/i.test(appearancePreferences.liquidTint)) appearancePreferences.liquidTint = appearanceDefaults.liquidTint;
  if (!/^data:image\/(?:png|jpeg|webp|avif);base64,/i.test(appearancePreferences.liquidBackgroundImage || "")) {
    appearancePreferences.liquidBackgroundImage = "";
    appearancePreferences.liquidBackgroundName = "";
  }
} catch {
  localStorage.removeItem("ai-scouter-preferences");
}

const stacks = [
  { name: "Research to decision", icon: "⌕", description: "Find current evidence, synthesize it, and turn it into a decision-ready brief.", toolIds: ["perplexity", "notebooklm", "claude"], task: "Research a current topic using credible sources, synthesize the evidence, and create a decision brief with risks and recommendations." },
  { name: "Website launch", icon: "⌘", description: "Plan, build, review, and polish a small website without losing the original brief.", toolIds: ["chatgpt", "cursor", "copilot"], task: "Plan and build a responsive website from my brief, test the important interactions, and review accessibility and launch readiness." },
  { name: "Content campaign", icon: "✦", description: "Move from a message to polished copy, branded visuals, and reusable social assets.", toolIds: ["claude", "grammarly", "canva"], task: "Turn my campaign goal into a concise message, polished copy, and a set of coordinated visual content ideas for social media." },
  { name: "Video explainer", icon: "▻", description: "Write the story, create or record the video, then edit it into a clean final piece.", toolIds: ["chatgpt", "synthesia", "descript"], task: "Create a short explainer video plan with a script, scene direction, presenter notes, captions, and a final editing checklist." },
  { name: "Creative concept", icon: "▧", description: "Explore a visual direction and convert it into production-ready campaign assets.", toolIds: ["midjourney", "firefly", "canva"], task: "Develop three visual directions for my campaign, compare their strengths, and turn the selected direction into a consistent asset plan." },
  { name: "Podcast production", icon: "◖", description: "Shape the episode, edit the recording, and prepare polished supporting audio.", toolIds: ["notebooklm", "descript", "elevenlabs"], task: "Turn my source notes into a podcast episode outline, editing plan, show notes, and a short promotional audio script." }
];

const workflows = [
  { title: "Competitor research", label: "Research", steps: ["Define the market and comparison criteria", "Collect current primary sources", "Separate facts from assumptions", "Summarize opportunities and risks"], task: "Research my current competitors using credible sources. Compare positioning, audience, pricing approach, strengths, and gaps, then create a cited strategy brief." },
  { title: "Build a landing page", label: "Coding", steps: ["Clarify audience and conversion goal", "Create the page structure", "Implement responsive interactions", "Test accessibility and performance"], task: "Build a responsive landing page from my brief. Start with the information hierarchy, implement the page, test every interaction, and finish with accessibility and performance checks." },
  { title: "Write in my voice", label: "Writing", steps: ["Identify voice patterns from examples", "Outline the argument", "Draft for meaning first", "Edit tone, rhythm, and clarity"], task: "Use my examples to identify my writing voice, then turn my notes into a polished article with a clear outline while preserving my tone and phrasing preferences." },
  { title: "Create a short video", label: "Creative", steps: ["Define one audience takeaway", "Write a concise script", "Build a shot or scene list", "Generate, edit, caption, and review"], task: "Create a 60-second video plan for my topic with one clear takeaway, a script, shot list, visual direction, captions, and a final production checklist." },
  { title: "Automate a routine task", label: "Automation", steps: ["Map the current process", "Choose a safe trigger", "Add AI only where judgment helps", "Test failures and approval steps"], task: "Help me automate this repeatable process. Map each step, identify where AI adds value, add human approvals for risky actions, and write a test plan for edge cases." },
  { title: "Learn a difficult topic", label: "Learning", steps: ["Assess what I already know", "Explain with a concrete example", "Practice one step at a time", "Test understanding and revisit gaps"], task: "Teach me this topic step by step. Begin by checking what I know, use concrete examples, give me short practice exercises, and correct misunderstandings before moving on." }
];

const useCases = [
  ["Write and edit", "Turn rough thinking into clear emails, reports, articles, and scripts.", "Turn my rough notes into a polished draft for the intended audience. Ask me about tone, length, and required points before writing."],
  ["Research a decision", "Find current evidence and compare options with sources attached.", "Research this decision using current, credible sources. Compare the options, explain tradeoffs, and clearly separate verified facts from inference."],
  ["Build software", "Plan, implement, debug, and review code with a clear test loop.", "Help me build this software task. Clarify requirements, propose a small plan, implement it, run relevant tests, and explain any remaining risks."],
  ["Analyze data", "Clean a dataset, test assumptions, and extract decision-relevant insights.", "Analyze this dataset. Check quality issues first, explain the method, show calculations, visualize the important patterns, and summarize actionable insights."],
  ["Create visuals", "Explore concepts, art direction, graphics, and campaign assets.", "Create three distinct visual directions for this project. For each, specify composition, palette, lighting, typography approach, style, and the best use cases."],
  ["Make video or audio", "Plan scripts, shots, narration, music, editing, and localization.", "Turn my idea into a production-ready media plan with a script, scene or audio direction, pacing, editing notes, captions, and a rights checklist."],
  ["Study and learn", "Understand source material, practice skills, and test retention.", "Teach me this material using my sources. Explain it simply, use examples, quiz me in small steps, and adapt based on what I misunderstand."],
  ["Automate work", "Connect repeatable steps while keeping approvals around risky actions.", "Map this workflow for automation. Identify triggers, inputs, decisions, outputs, failure cases, privacy risks, and the steps that should require human approval."]
];

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));

function searchStem(token) {
  return token
    .replace(/[^a-z0-9]+/g, "")
    .replace(/(ators?|ations?|ating|ated|ates?)$/, "")
    .replace(/(ers?|ing|ed|s)$/, "");
}

function toolSearchIndex(tool) {
  const strongCategories = Object.entries(tool.categories)
    .filter(([, score]) => score >= 7)
    .map(([category]) => category);
  return [tool.name, tool.type, tool.tagline, tool.description, ...tool.keywords, ...tool.strengths, ...strongCategories]
    .join(" ")
    .toLowerCase()
    .split(/\s+/)
    .map(searchStem)
    .join(" ");
}

function toolMatchesFilter(tool, filter) {
  const isGeneralist = ["chatgpt", "claude", "gemini"].includes(tool.id);
  return filter === "all"
    || tool.group === filter
    || (filter === "general" && isGeneralist)
    || (filter === "specialist" && !isGeneralist);
}

function searchTools(query, filter = "all") {
  const tokens = query.toLowerCase().split(/\s+/).map(searchStem).filter(Boolean);
  return tools.filter((tool) => {
    const index = toolSearchIndex(tool);
    return toolMatchesFilter(tool, filter) && tokens.every((token) => index.includes(token));
  });
}

function inferCategory(text) {
  const categoryKeywords = {
    writing: ["write", "rewrite", "article", "email", "copy", "story", "essay", "brief"],
    coding: ["code", "build", "debug", "website", "app", "api", "repo", "software"],
    research: ["research", "current", "latest", "sources", "compare", "market", "competitor"],
    data: ["data", "spreadsheet", "csv", "chart", "forecast", "statistics", "analyze"],
    image: ["image", "illustration", "logo", "poster", "photo", "visual", "moodboard"],
    video: ["video", "film", "clip", "animate", "b-roll", "storyboard", "motion"],
    learning: ["learn", "study", "exam", "teach", "explain", "notes", "course"],
    audio: ["audio", "voice", "voiceover", "podcast", "speech", "narration", "dub"]
  };

  return Object.entries(categoryKeywords)
    .map(([category, words]) => ({ category, score: words.filter((word) => text.includes(word)).length }))
    .sort((a, b) => b.score - a.score)[0];
}

function scoreTools({ task, category, priority, budget }) {
  const normalizedTask = task.toLowerCase();
  const inferred = inferCategory(normalizedTask);
  const chosenCategory = category || (inferred?.score ? inferred.category : "writing");

  const ranked = tools.map((tool) => {
    let score = 25 + (tool.categories[chosenCategory] || 0) * 5.2 + (tool.priorities[priority] || 0) * 2.2;
    const keywordHits = tool.keywords.filter((keyword) => normalizedTask.includes(keyword));
    score += Math.min(keywordHits.length, 4) * 6;

    if (budget === "free" && ["midjourney", "runway", "elevenlabs"].includes(tool.id)) score -= 8;
    if (chosenCategory === "research" && priority === "sources" && ["perplexity", "notebooklm"].includes(tool.id)) score += 8;
    if (chosenCategory === "coding" && ["copilot", "claude", "chatgpt"].includes(tool.id)) score += 5;
    if (["image", "video", "audio"].includes(chosenCategory) && tool.group === "media") score += 5;

    return { ...tool, rawScore: score, keywordHits, chosenCategory };
  }).sort((a, b) => b.rawScore - a.rawScore);

  const high = ranked[0].rawScore;
  return ranked.map((tool, index) => ({
    ...tool,
    match: Math.max(64, Math.min(97, Math.round(95 - (high - tool.rawScore) * 0.55 - index * 0.8)))
  }));
}

function buildPrompt(task, category) {
  const instructions = {
    writing: "First ask for the intended audience, voice, and desired length. Then produce a clear outline before drafting.",
    coding: "Inspect the requirements, state assumptions, propose a small implementation plan, then build and test the result.",
    research: "Use current, credible sources. Separate verified facts from inference and include links beside each important claim.",
    data: "Explain the method, check the data for quality issues, show calculations, and summarize the decision-relevant insights.",
    image: "Offer three distinct visual directions before generating. Specify composition, lighting, palette, style, and aspect ratio.",
    video: "Turn the brief into a shot list with subject, action, environment, camera movement, lighting, and timing.",
    learning: "Teach this step by step, use a concrete example, check my understanding, and finish with a short practice exercise.",
    audio: "Prepare a performance-ready script and specify voice, pacing, tone, pronunciation notes, and pauses."
  };
  return `I need help with this task: ${task.trim()}\n\n${instructions[category] || instructions.writing} Flag any uncertainty instead of guessing.`;
}

function renderResults(ranked, values) {
  const [best, ...rest] = ranked;
  const prompt = buildPrompt(values.task, best.chosenCategory);
  const reasons = [
    best.strengths[0],
    best.strengths[1],
    best.keywordHits.length ? `Your brief directly signals: ${best.keywordHits.slice(0, 3).join(", ")}.` : `Its ${best.type.toLowerCase()} profile fits this kind of output.`
  ];

  primaryResult.style.setProperty("--tool-color", best.color);
  primaryResult.innerHTML = `
    <div class="result-identity">
      <div>
        <span class="match-badge"><i></i> TOP RECOMMENDATION</span>
        <div class="tool-monogram">${best.mark}</div>
        <h3>${best.name}</h3>
        <p>${best.tagline}</p>
      </div>
      <a class="official-link" href="${best.url}" target="_blank" rel="noopener noreferrer">Visit official site <span>↗</span></a>
    </div>
    <div class="result-detail">
      <div class="score-ring"><strong>${best.match}%</strong><span>MATCH SCORE</span></div>
      <ul class="reason-list">${reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul>
      <div class="watch-out"><strong>Watch out:</strong> ${escapeHtml(best.watch)}</div>
      <div class="prompt-box">
        <span>STARTER PROMPT</span>
        <p>${escapeHtml(prompt)}</p>
        <button class="copy-prompt" type="button" data-prompt="${escapeHtml(prompt)}">Copy prompt</button>
      </div>
    </div>`;

  alternativeGrid.innerHTML = rest.slice(0, 2).map((tool) => `
    <article class="alternative-card" style="--tool-color: ${tool.color}">
      <span class="mini-mark">${tool.mark}</span>
      <div><h4>${tool.name}</h4><p>${tool.tagline}</p></div>
      <span class="alternative-score">${tool.match}%</span>
    </article>`).join("");

  privacyAlert.hidden = !values.sensitive;
  results.hidden = false;
  localStorage.setItem("ai-match-last-category", best.chosenCategory);
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function toolProfileInsightsMarkup(tool) {
  const capabilityEntries = Object.entries(tool.categories).sort((a, b) => b[1] - a[1]).slice(0, 6);
  return `
    <div class="folio-capability-chart">${capabilityEntries.map(([name, score]) => `<div><span>${name}</span><i><b style="width:${score * 10}%"></b></i><strong>${score}/10</strong></div>`).join("")}</div>
    <div class="folio-strength-grid">${tool.strengths.slice(0, 3).map((strength) => `<article><span>✓</span><p>${escapeHtml(strength)}</p></article>`).join("")}</div>
    <div class="folio-watch"><span>KEEP IN MIND</span><p>${escapeHtml(tool.watch)}</p></div>`;
}

function toolCardMarkup(tool) {
  const isSaved = savedToolIds.has(tool.id);
  return `
    <article class="directory-card" data-tool-id="${tool.id}" data-group="${tool.group}" data-search="${escapeHtml(toolSearchIndex(tool))}" style="--tool-color: ${tool.color}">
      <div class="directory-card-top">
        <div class="tool-identity"><span class="directory-mark">${tool.mark}</span><div><h3>${tool.name}</h3><span class="directory-type">${tool.type}</span></div></div>
        <button class="save-tool ${isSaved ? "saved" : ""}" type="button" data-save="${tool.id}" aria-pressed="${isSaved}" aria-label="${isSaved ? "Remove" : "Save"} ${tool.name}">${isSaved ? "♥" : "♡"}</button>
      </div>
      <div class="tool-meta"><span class="fit-chip">Best fit</span><span aria-label="Highly capable">★★★★☆</span></div>
      <p>${tool.description}</p>
      <section class="directory-hover-panel" data-ui-corners="panel" aria-label="More information about ${escapeHtml(tool.name)}">
        <div class="directory-hover-heading"><span>FULL TOOL PROFILE</span><strong>${Math.max(...Object.values(tool.categories)) * 9 + 7}% fit</strong></div>
        <p>${escapeHtml(tool.tagline)}</p>
        ${toolProfileInsightsMarkup(tool)}
      </section>
      <div class="directory-actions"><button class="details-button" type="button" data-details="${tool.id}">View details</button><a class="visit-button" href="${tool.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${tool.name} official site">Visit ↗</a></div>
    </article>`;
}

function updateDirectoryCardSpan(card) {
  if (!card?.isConnected || card.hidden) return;
  const grid = card.closest(".tool-directory");
  if (!grid) return;
  const gap = Number.parseFloat(getComputedStyle(grid).getPropertyValue("--directory-gap")) || 0;
  const height = card.getBoundingClientRect().height;
  card.style.gridRowEnd = `span ${Math.max(1, Math.ceil(height + gap))}`;
}

const directoryMasonryObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target }) => updateDirectoryCardSpan(target));
});

function releaseDirectoryCards(container) {
  container.querySelectorAll(".directory-card").forEach((card) => directoryMasonryObserver.unobserve(card));
}

function observeDirectoryCards(container) {
  container.querySelectorAll(".directory-card").forEach((card) => {
    directoryMasonryObserver.observe(card);
    window.requestAnimationFrame(() => updateDirectoryCardSpan(card));
  });
}

function renderDirectory() {
  releaseDirectoryCards(directory);
  directory.innerHTML = tools.map(toolCardMarkup).join("");
  observeDirectoryCards(directory);
}

function renderSavedTools() {
  const savedTools = tools.filter((tool) => savedToolIds.has(tool.id));
  releaseDirectoryCards(savedDirectory);
  savedDirectory.innerHTML = savedTools.map(toolCardMarkup).join("");
  savedEmpty.hidden = savedTools.length > 0;
  savedDirectory.hidden = savedTools.length === 0;
  savedCount.textContent = String(savedTools.length);
  observeDirectoryCards(savedDirectory);
}

function renderFolioDashboard() {
  if (!folioToolList || !folioToolDetail) return;
  const visibleTools = searchTools(folioSearch.value, activeFolioFilter);
  if (!visibleTools.some((tool) => tool.id === selectedFolioToolId)) selectedFolioToolId = visibleTools[0]?.id || "";
  folioCount.textContent = `${visibleTools.length} ${visibleTools.length === 1 ? "tool" : "tools"}`;
  folioToolList.innerHTML = visibleTools.length ? visibleTools.map((tool) => `
    <button type="button" class="folio-tool-row ${tool.id === selectedFolioToolId ? "active" : ""}" data-folio-tool="${tool.id}">
      <i style="--tool-color:${tool.color}">${tool.mark}</i><span><b>${tool.name}</b><small>${tool.type}</small></span><em>View ↗<small>${tool.group === "words" ? "AI assistant" : tool.group === "build" ? "Build tool" : "Creative tool"}</small></em>
    </button>`).join("") : `<div class="folio-no-results"><b>No matching tools</b><span>Try a broader task or another category.</span></div>`;

  const tool = tools.find((item) => item.id === selectedFolioToolId);
  atlasVisibleCount.textContent = String(visibleTools.length);
  atlasCoverageLabel.textContent = `${Math.round((visibleTools.length / tools.length) * 100)}% currently visible`;
  atlasSavedCount.textContent = String(savedToolIds.size);
  atlasActiveTool.textContent = tool?.name || "No match";
  atlasActiveType.textContent = tool?.type || "Adjust the search criteria";
  if (!tool) {
    folioToolDetail.innerHTML = `<div class="folio-no-selection">Select a tool to inspect it.</div>`;
    return;
  }
  const isSaved = savedToolIds.has(tool.id);
  folioToolDetail.innerHTML = `
    <header><span>⠿</span><b>Tool profile</b><button type="button" data-go-page="compare">⇄ Compare</button></header>
    <div class="folio-tool-heading"><i style="--tool-color:${tool.color}">${tool.mark}</i><div><h2>${tool.name}</h2><span>${tool.type}</span></div><button type="button" data-save="${tool.id}">${isSaved ? "★ Saved" : "☆ Save"}</button></div>
    <div class="folio-fit"><strong>${Math.max(...Object.values(tool.categories)) * 9 + 7}%</strong><span>FIT FOR ITS STRONGEST TASKS</span><small>OFFICIAL PRODUCT LINK</small></div>
    <p class="folio-tool-copy">${tool.description}</p>
    <div class="folio-capability-tabs"><button class="active" type="button">Capabilities</button><button type="button">Strengths</button><button type="button">Tradeoffs</button></div>
    ${toolProfileInsightsMarkup(tool)}
    <a class="folio-visit" href="${tool.url}" target="_blank" rel="noopener noreferrer">Visit ${tool.name} <span>↗</span></a>`;
}

function toggleSavedTool(toolId) {
  if (savedToolIds.has(toolId)) savedToolIds.delete(toolId);
  else savedToolIds.add(toolId);
  localStorage.setItem("ai-scouter-saved", JSON.stringify([...savedToolIds]));
  renderDirectory();
  renderSavedTools();
  renderFolioDashboard();
  applyDirectoryFilters();
  const tool = tools.find((item) => item.id === toolId);
  showToast(savedToolIds.has(toolId) ? `${tool.name} saved` : `${tool.name} removed`);
}

function applyDirectoryFilters() {
  const visibleToolIds = new Set(searchTools(toolSearch.value, activeDirectoryFilter).map((tool) => tool.id));
  let visible = 0;
  directory.querySelectorAll(".directory-card").forEach((card) => {
    card.hidden = !visibleToolIds.has(card.dataset.toolId);
    if (!card.hidden) visible += 1;
  });
  toolCount.textContent = `Showing ${visible} ${visible === 1 ? "tool" : "tools"}`;
  window.requestAnimationFrame(() => {
    directory.querySelectorAll(".directory-card:not([hidden])").forEach(updateDirectoryCardSpan);
  });
}

function openToolDialog(toolId) {
  const tool = tools.find((item) => item.id === toolId);
  if (!tool) return;
  dialogContent.innerHTML = `
    <div class="dialog-body" style="--tool-color: ${tool.color}">
      <div class="dialog-head"><span class="directory-mark">${tool.mark}</span><div><h3>${tool.name}</h3><p>${tool.type}</p></div></div>
      <p class="dialog-copy">${tool.description}</p>
      <ul class="dialog-strengths">${tool.strengths.map((strength) => `<li>${escapeHtml(strength)}</li>`).join("")}</ul>
      <div class="dialog-watch"><strong>Keep in mind:</strong> ${escapeHtml(tool.watch)}</div>
      <a class="dialog-link" href="${tool.url}" target="_blank" rel="noopener noreferrer">Visit official site <span>↗</span></a>
    </div>`;
  toolDialog.showModal();
}

function renderStacks() {
  document.querySelector("#stack-grid").innerHTML = stacks.map((stack) => `
    <article class="stack-card">
      <div class="stack-card-head"><span>${stack.icon}</span><div><small>3-TOOL STACK</small><h2>${stack.name}</h2></div></div>
      <p>${stack.description}</p>
      <div class="stack-tools">${stack.toolIds.map((id, index) => {
        const tool = tools.find((item) => item.id === id);
        return `<button type="button" data-open-tool="${tool.id}" style="--tool-color:${tool.color}"><i>${tool.mark}</i><span>${tool.name}</span></button>${index < stack.toolIds.length - 1 ? "<b>+</b>" : ""}`;
      }).join("")}</div>
      <button class="primary-action" type="button" data-use-task="${escapeHtml(stack.task)}">Scout this workflow →</button>
    </article>`).join("");
}

function renderWorkflows() {
  document.querySelector("#workflow-grid").innerHTML = workflows.map((workflow, index) => `
    <article class="workflow-card"><div class="card-number">${String(index + 1).padStart(2, "0")}</div><span class="card-label">${workflow.label}</span><h2>${workflow.title}</h2><ol>${workflow.steps.map((step) => `<li>${step}</li>`).join("")}</ol><button type="button" data-use-task="${escapeHtml(workflow.task)}">Use this workflow →</button></article>`).join("");
}

function renderUseCases() {
  document.querySelector("#use-case-grid").innerHTML = useCases.map(([title, description, task], index) => `
    <article class="use-case-card"><span>${["✎", "⌕", "⌘", "↗", "▧", "▻", "◫", "⌁"][index]}</span><h2>${title}</h2><p>${description}</p><button type="button" data-use-task="${escapeHtml(task)}">Find my tools →</button></article>`).join("");
}

function renderCompare() {
  comparePicker.innerHTML = tools.map((tool) => {
    const selected = comparedToolIds.includes(tool.id);
    return `<button type="button" class="compare-chip ${selected ? "selected" : ""}" data-compare="${tool.id}" aria-pressed="${selected}" style="--tool-color:${tool.color}"><i>${tool.mark}</i>${tool.name}<span>${selected ? "✓" : "+"}</span></button>`;
  }).join("");

  const selectedTools = comparedToolIds.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean);
  if (!selectedTools.length) {
    compareOutput.innerHTML = `<div class="empty-state compact"><span>⇄</span><h2>Select tools to compare</h2><p>Choose up to three products above.</p></div>`;
    return;
  }
  const bestCategory = (tool) => Object.entries(tool.categories).sort((a, b) => b[1] - a[1])[0][0];
  compareOutput.innerHTML = `<table class="compare-table"><thead><tr><th>Criteria</th>${selectedTools.map((tool) => `<th><span class="directory-mark" style="--tool-color:${tool.color}">${tool.mark}</span><strong>${tool.name}</strong><small>${tool.type}</small></th>`).join("")}</tr></thead><tbody>
    <tr><th>Best at</th>${selectedTools.map((tool) => `<td>${bestCategory(tool)}</td>`).join("")}</tr>
    <tr><th>Working style</th>${selectedTools.map((tool) => `<td>${tool.tagline}</td>`).join("")}</tr>
    <tr><th>Top strength</th>${selectedTools.map((tool) => `<td>${tool.strengths[0]}</td>`).join("")}</tr>
    <tr><th>Keep in mind</th>${selectedTools.map((tool) => `<td>${tool.watch}</td>`).join("")}</tr>
    <tr><th>Official site</th>${selectedTools.map((tool) => `<td><a href="${tool.url}" target="_blank" rel="noopener noreferrer">Visit ${tool.name} ↗</a></td>`).join("")}</tr>
  </tbody></table>`;
}

function useTask(task) {
  showPage("tools");
  taskInput.value = task;
  taskInput.dispatchEvent(new Event("input"));
  window.setTimeout(() => {
    document.querySelector("#matcher").scrollIntoView({ behavior: "smooth", block: "start" });
    taskInput.focus();
  }, 30);
}

function showPage(pageName, updateHash = true) {
  const validPage = document.querySelector(`[data-page="${pageName}"]`) ? pageName : "tools";
  document.querySelectorAll(".app-page").forEach((page) => page.classList.toggle("active", page.dataset.page === validPage));
  const primaryToolsNavLink = document.querySelector('.sidebar nav .nav-link[data-page-link="tools"]');
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    const duplicateToolsNav = validPage === "tools" && link.classList.contains("nav-link") && link.dataset.pageLink === "tools" && link !== primaryToolsNavLink;
    link.classList.toggle("active", link.dataset.pageLink === validPage && !duplicateToolsNav);
  });
  if (updateHash) history.replaceState(null, "", `#${validPage}`);
  closeNavigation();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resolvedAppearance() {
  return appearancePreferences.mode === "system"
    ? (systemColorScheme.matches ? "dark" : "light")
    : appearancePreferences.mode;
}

function normalizeHex(hex) {
  const normalized = String(hex || "").replace("#", "");
  return /^[0-9a-f]{6}$/i.test(normalized) ? `#${normalized.toLowerCase()}` : "#111111";
}

function hexChannels(hex) {
  const normalized = normalizeHex(hex).slice(1);
  return [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16));
}

function colorLuminance(hex) {
  const channels = hexChannels(hex).map((value) => value / 255).map((value) => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function colorContrast(first, second) {
  const light = Math.max(colorLuminance(first), colorLuminance(second));
  const dark = Math.min(colorLuminance(first), colorLuminance(second));
  return (light + 0.05) / (dark + 0.05);
}

function mixHex(foreground, background, foregroundWeight) {
  const front = hexChannels(foreground);
  const back = hexChannels(background);
  const weight = Math.max(0, Math.min(1, foregroundWeight));
  const mixed = front.map((channel, index) => Math.round(channel * weight + back[index] * (1 - weight)));
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function accentTextFor(hex) {
  const background = normalizeHex(hex);
  const candidates = ["#102015", "#ffffff"];
  return candidates.sort((first, second) => colorContrast(second, background) - colorContrast(first, background))[0];
}

function ensureColorContrast(color, background, minimum = 4.5) {
  const base = normalizeHex(color);
  const backdrop = normalizeHex(background);
  if (colorContrast(base, backdrop) >= minimum) return base;
  const target = accentTextFor(backdrop);
  for (let step = 1; step <= 20; step += 1) {
    const candidate = mixHex(target, base, step / 20);
    if (colorContrast(candidate, backdrop) >= minimum) return candidate;
  }
  return target;
}

const folioColorProperties = [
  "--primary", "--primary-dark", "--primary-soft", "--accent-text", "--accent-shadow",
  "--canvas", "--sidebar-bg", "--surface", "--surface-soft", "--ink", "--text", "--muted", "--line", "--line-strong",
  "--active-surface", "--active-text", "--folio-focus", "--folio-dot"
];

function applyFolioColors(root, effectiveMode) {
  const accent = normalizeHex(appearancePreferences.folioAccent);
  const background = normalizeHex(effectiveMode === "dark" ? appearancePreferences.folioBackground : appearancePreferences.folioLightBackground);
  const ink = accentTextFor(background);
  const surfaceDirection = ink === "#ffffff" ? "#102015" : "#ffffff";
  const surface = colorLuminance(background) > 0.72 ? "#ffffff" : mixHex(surfaceDirection, background, 0.06);
  const surfaceSoft = mixHex(surfaceDirection, background, 0.12);
  const primary = ensureColorContrast(accent, surface, 4.5);
  const activeSurface = mixHex(accent, surface, 0.16);
  const activeText = ensureColorContrast(ink, activeSurface, 4.5);
  const text = ensureColorContrast(ensureColorContrast(mixHex(ink, background, 0.88), background, 4.5), surface, 4.5);
  const muted = ensureColorContrast(ensureColorContrast(mixHex(ink, background, 0.62), background, 4.5), surface, 4.5);
  root.style.setProperty("--primary", primary);
  root.style.setProperty("--primary-dark", primary);
  root.style.setProperty("--primary-soft", mixHex(primary, surface, 0.04));
  root.style.setProperty("--active-surface", activeSurface);
  root.style.setProperty("--active-text", activeText);
  root.style.setProperty("--accent-text", accentTextFor(primary));
  root.style.setProperty("--accent-shadow", `color-mix(in srgb, ${primary} 22%, transparent)`);
  root.style.setProperty("--folio-focus", accent === "#afca7d" ? "#abbb9e" : mixHex(primary, surface, 0.55));
  root.style.setProperty("--folio-dot", mixHex(accent, ink, 0.82));
  root.style.setProperty("--canvas", background);
  root.style.setProperty("--sidebar-bg", surface);
  root.style.setProperty("--surface", surface);
  root.style.setProperty("--surface-soft", surfaceSoft);
  root.style.setProperty("--ink", ink);
  root.style.setProperty("--text", text);
  root.style.setProperty("--muted", muted);
  root.style.setProperty("--line", mixHex(primary, surface, effectiveMode === "dark" ? 0.20 : 0.16));
  root.style.setProperty("--line-strong", mixHex(primary, surface, effectiveMode === "dark" ? 0.30 : 0.22));
}

const liquidBackgroundLabels = {
  aurora: "Aurora Flow",
  coast: "Pacific Coast",
  orchid: "Orchid Light",
  midnight: "Midnight Bloom"
};

const liquidStyleProperties = [
  "--liquid-glass-alpha", "--liquid-glass-blur", "--liquid-tint", "--liquid-custom-background"
];

function safeLiquidBackgroundImage(value) {
  return /^data:image\/(?:png|jpeg|webp|avif);base64,/i.test(String(value || "")) ? value : "";
}

function liquidIntensityLabel(value) {
  if (value <= 22) return "Ultraclear";
  if (value <= 58) return "Balanced";
  if (value <= 82) return "Tinted";
  return "Fully tinted";
}

function applyLiquidGlass(root) {
  const level = Math.max(0, Math.min(100, Number(appearancePreferences.liquidGlass) || 0));
  const image = safeLiquidBackgroundImage(appearancePreferences.liquidBackgroundImage);
  root.dataset.liquidBackground = liquidBackgroundLabels[appearancePreferences.liquidBackground]
    ? appearancePreferences.liquidBackground
    : appearanceDefaults.liquidBackground;
  root.dataset.liquidCustomBackground = String(Boolean(image));
  root.style.setProperty("--liquid-glass-alpha", String(0.14 + level * 0.0042));
  root.style.setProperty("--liquid-glass-blur", `${30 - level * 0.1}px`);
  root.style.setProperty("--liquid-tint", normalizeHex(appearancePreferences.liquidTint));
  root.style.setProperty("--liquid-custom-background", image ? `url("${image}")` : "none");
}

function syncSettingsControls() {
  const folioLocked = isFolioPalette(appearancePreferences.palette);
  const liquidActive = isLiquidPalette(appearancePreferences.palette);
  document.querySelectorAll('input[name="appearance"]').forEach((input) => {
    input.checked = input.value === appearancePreferences.mode;
  });
  document.querySelectorAll("[data-palette-option]").forEach((button) => {
    const selected = button.dataset.paletteOption === appearancePreferences.palette;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelectorAll("[data-layout-option]").forEach((button) => {
    const selected = button.dataset.layoutOption === appearancePreferences.layout;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  radiusRange.value = String(appearancePreferences.radius);
  radiusRange.disabled = folioLocked;
  radiusOutput.textContent = folioLocked ? "Fixed · 6–13 px" : `${appearancePreferences.radius} px`;
  boldToggle.checked = appearancePreferences.bold;
  boldToggle.disabled = folioLocked;
  boldLabel.textContent = folioLocked ? "Fixed bold" : (appearancePreferences.bold ? "Bold" : "Regular");
  hoverInfoToggle.checked = appearancePreferences.moreInfo;
  hoverInfoLabel.textContent = appearancePreferences.moreInfo ? "On" : "Off";
  cornerSettings.classList.toggle("locked-setting", folioLocked);
  typeSettings.classList.toggle("locked-setting", folioLocked);
  document.querySelector('[data-reset-setting="radius"]').disabled = folioLocked;
  document.querySelector('[data-reset-setting="bold"]').disabled = folioLocked;
  folioColorSetting.hidden = !folioLocked;
  folioAccent.value = appearancePreferences.folioAccent;
  folioColorValue.textContent = appearancePreferences.folioAccent.toUpperCase();
  const folioBackgroundSetting = resolvedAppearance() === "dark" ? "folioBackground" : "folioLightBackground";
  const activeFolioBackground = appearancePreferences[folioBackgroundSetting];
  folioBackground.value = activeFolioBackground;
  folioBackgroundValue.textContent = activeFolioBackground.toUpperCase();
  document.querySelector('[data-reset-setting="folioBackground"], [data-reset-setting="folioLightBackground"]').dataset.resetSetting = folioBackgroundSetting;
  liquidSettings.hidden = !liquidActive;
  liquidGlassRange.value = String(appearancePreferences.liquidGlass);
  liquidGlassOutput.textContent = `${appearancePreferences.liquidGlass}% · ${liquidIntensityLabel(Number(appearancePreferences.liquidGlass))}`;
  liquidTint.value = normalizeHex(appearancePreferences.liquidTint);
  liquidTintValue.textContent = liquidTint.value.toUpperCase();
  const uploadedBackground = Boolean(safeLiquidBackgroundImage(appearancePreferences.liquidBackgroundImage));
  liquidBackgroundStatus.textContent = uploadedBackground
    ? `Custom · ${appearancePreferences.liquidBackgroundName || "Browser image"}`
    : (liquidBackgroundLabels[appearancePreferences.liquidBackground] || liquidBackgroundLabels[appearanceDefaults.liquidBackground]);
  liquidBackgroundGrid.querySelectorAll("[data-liquid-background]").forEach((button) => {
    const selected = !uploadedBackground && button.dataset.liquidBackground === appearancePreferences.liquidBackground;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  liquidBackgroundClear.disabled = !uploadedBackground;
}

function applyAppearance({ save = true } = {}) {
  const effectiveMode = resolvedAppearance();
  const root = document.documentElement;
  root.dataset.theme = effectiveMode;
  const folioLocked = isFolioPalette(appearancePreferences.palette);
  root.dataset.palette = appearancePreferences.palette;
  root.dataset.layout = appearancePreferences.layout;
  root.dataset.moreInfo = String(appearancePreferences.moreInfo);
  root.dataset.fixedStyle = folioLocked ? "folio" : "none";
  root.dataset.bold = String(folioLocked ? true : appearancePreferences.bold);
  root.style.setProperty("--user-radius", `${folioLocked ? 6 : appearancePreferences.radius}px`);
  if (folioLocked) {
    applyFolioColors(root, effectiveMode);
  } else {
    folioColorProperties.forEach((property) => root.style.removeProperty(property));
  }
  if (isLiquidPalette(appearancePreferences.palette)) {
    applyLiquidGlass(root);
  } else {
    root.dataset.liquidBackground = appearancePreferences.liquidBackground;
    root.dataset.liquidCustomBackground = "false";
    liquidStyleProperties.forEach((property) => root.style.removeProperty(property));
  }
  root.style.colorScheme = effectiveMode;

  const button = document.querySelector("#theme-toggle");
  button.querySelector("span").textContent = effectiveMode === "dark" ? "☾" : "☼";
  button.querySelector("b").textContent = appearancePreferences.mode === "system"
    ? `System · ${effectiveMode}`
    : `${effectiveMode[0].toUpperCase()}${effectiveMode.slice(1)} theme`;
  button.setAttribute("aria-label", `Current appearance: ${appearancePreferences.mode}, showing ${effectiveMode}. Open settings to customize.`);
  appearanceStatus.textContent = appearancePreferences.mode === "system"
    ? `System · ${effectiveMode}`
    : `${effectiveMode[0].toUpperCase()}${effectiveMode.slice(1)}`;
  folioModeToggle.innerHTML = effectiveMode === "light" ? "☾ <span>Dark mode</span>" : "☼ <span>Light mode</span>";
  folioModeToggle.setAttribute("aria-label", `Switch to ${effectiveMode === "light" ? "dark" : "light"} mode`);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", getComputedStyle(root).getPropertyValue("--canvas").trim() || (effectiveMode === "dark" ? "#11141d" : "#f8f9fc"));
  syncSettingsControls();
  renderFolioDashboard();
  if (save) localStorage.setItem("ai-scouter-preferences", JSON.stringify(appearancePreferences));
}

function createBlueprint(values) {
  const ranked = scoreTools({ task: values.goal, category: "", priority: "quality", budget: values.budget });
  const recommended = ranked.slice(0, 3);
  const inferred = inferCategory(values.goal.toLowerCase());
  const connections = values.connections.length ? values.connections : ["No external connection selected"];
  const reviewStep = values.sensitive || values.automation !== "auto"
    ? "Pause for human approval and verify the result"
    : "Validate the result against automatic acceptance rules";
  const blueprint = {
    id: Date.now(),
    projectName: values.projectName,
    goal: values.goal,
    input: values.input,
    delivery: values.delivery,
    automation: values.automation,
    connections,
    sensitive: values.sensitive,
    category: inferred?.score ? inferred.category : "general",
    tools: recommended.map((tool) => ({ id: tool.id, name: tool.name, role: tool.type })),
    steps: [
      `Receive and validate ${values.input.toLowerCase()}`,
      `Prepare context and route the task to ${recommended[0].name}`,
      `Refine or cross-check the result with ${recommended[1].name}`,
      reviewStep,
      `Deliver the approved result as ${values.delivery.toLowerCase()}`
    ]
  };
  return blueprint;
}

function renderBlueprint(blueprint) {
  blueprintEmpty.hidden = true;
  blueprintOutput.hidden = false;
  blueprintOutput.dataset.blueprintId = String(blueprint.id);
  blueprintOutput.innerHTML = `
    <div class="blueprint-head"><div><span>GENERATED BLUEPRINT</span><h2>${escapeHtml(blueprint.projectName)}</h2><p>${escapeHtml(blueprint.goal)}</p></div><strong>${escapeHtml(blueprint.category)}</strong></div>
    <div class="blueprint-meta"><span>Input <b>${escapeHtml(blueprint.input)}</b></span><span>Delivery <b>${escapeHtml(blueprint.delivery)}</b></span><span>Mode <b>${escapeHtml(blueprint.automation)}</b></span></div>
    <div class="pipeline" aria-label="Workflow steps">${blueprint.steps.map((step, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><div><h3>${index === 0 ? "Trigger" : index === blueprint.steps.length - 1 ? "Delivery" : index === 3 ? "Review gate" : "AI step"}</h3><p>${escapeHtml(step)}</p></div></article>`).join("")}</div>
    <div class="blueprint-tools"><span>RECOMMENDED STACK</span>${blueprint.tools.map((tool) => {
      const source = tools.find((item) => item.id === tool.id);
      return `<button type="button" data-open-tool="${source.id}" style="--tool-color:${source.color}"><i>${source.mark}</i><span><b>${source.name}</b><small>${source.type}</small></span></button>`;
    }).join("")}</div>
    <div class="blueprint-connections"><span>PLANNED CONNECTIONS</span><p>${blueprint.connections.map(escapeHtml).join(" · ")}</p></div>
    ${blueprint.sensitive ? '<div class="blueprint-warning"><b>Privacy gate added</b><span>Remove unnecessary personal data, use approved accounts, and require a person to review before delivery.</span></div>' : ""}
    <div class="blueprint-actions"><button type="button" data-blueprint-action="save">Save blueprint</button><button type="button" data-blueprint-action="copy">Copy JSON</button><button type="button" data-blueprint-action="matcher">Scout the primary task →</button></div>`;
  blueprintOutput._blueprint = blueprint;
}

taskInput.addEventListener("input", () => {
  characterCount.textContent = `${taskInput.value.length} / 320`;
  taskError.textContent = "";
  taskInput.removeAttribute("aria-invalid");
});

document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", () => {
    taskInput.value = button.dataset.example;
    taskInput.dispatchEvent(new Event("input"));
    taskInput.focus();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const task = String(data.get("task") || "").trim();

  if (task.length < 12) {
    taskError.textContent = "Add a little more detail so the match is useful.";
    taskInput.setAttribute("aria-invalid", "true");
    taskInput.focus();
    return;
  }

  const values = {
    task,
    category: String(data.get("category") || ""),
    priority: String(data.get("priority") || "quality"),
    budget: String(data.get("budget") || "free"),
    sensitive: data.get("sensitive") === "on"
  };

  renderResults(scoreTools(values), values);
});

document.querySelector("#reset-button").addEventListener("click", () => {
  form.reset();
  taskInput.value = "";
  taskInput.dispatchEvent(new Event("input"));
  results.hidden = true;
  document.querySelector("#matcher").scrollIntoView({ behavior: "smooth" });
});

primaryResult.addEventListener("click", async (event) => {
  const button = event.target.closest(".copy-prompt");
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.prompt);
    showToast("Starter prompt copied");
  } catch {
    showToast("Select the prompt to copy it");
  }
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeDirectoryFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".view-button").forEach((item) => item.classList.toggle("active", item.dataset.viewFilter === activeDirectoryFilter));
    applyDirectoryFilters();
  });
});

document.querySelectorAll(".view-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeDirectoryFilter = button.dataset.viewFilter;
    document.querySelectorAll(".view-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item.dataset.filter === activeDirectoryFilter;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    applyDirectoryFilters();
  });
});

renderDirectory();
renderSavedTools();
renderStacks();
renderWorkflows();
renderUseCases();
renderCompare();
applyDirectoryFilters();

toolSearch.addEventListener("input", applyDirectoryFilters);

directory.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    toggleSavedTool(saveButton.dataset.save);
    return;
  }
  const detailsButton = event.target.closest("[data-details]");
  if (detailsButton) openToolDialog(detailsButton.dataset.details);
});

savedDirectory.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    toggleSavedTool(saveButton.dataset.save);
    return;
  }
  const detailsButton = event.target.closest("[data-details]");
  if (detailsButton) openToolDialog(detailsButton.dataset.details);
});

comparePicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-compare]");
  if (!button) return;
  const id = button.dataset.compare;
  if (comparedToolIds.includes(id)) comparedToolIds = comparedToolIds.filter((item) => item !== id);
  else if (comparedToolIds.length < 3) comparedToolIds.push(id);
  else {
    showToast("Compare up to three tools at a time");
    return;
  }
  renderCompare();
});

document.addEventListener("click", (event) => {
  const pageLink = event.target.closest("[data-page-link]");
  if (pageLink) {
    event.preventDefault();
    showPage(pageLink.dataset.pageLink);
    return;
  }
  const goButton = event.target.closest("[data-go-page]");
  if (goButton) {
    showPage(goButton.dataset.goPage);
    return;
  }
  const taskButton = event.target.closest("[data-use-task]");
  if (taskButton) {
    useTask(taskButton.dataset.useTask);
    return;
  }
  const toolButton = event.target.closest("[data-open-tool]");
  if (toolButton) openToolDialog(toolButton.dataset.openTool);
});

document.querySelector("#dialog-close").addEventListener("click", () => toolDialog.close());
toolDialog.addEventListener("click", (event) => {
  if (event.target === toolDialog) toolDialog.close();
});

const menuButton = document.querySelector("#menu-button");
const sidebarToggle = document.querySelector("#sidebar-toggle");
const closeNavigation = () => {
  document.body.classList.remove("nav-open");
  menuButton.setAttribute("aria-expanded", "false");
};

sidebarToggle.addEventListener("click", () => {
  const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
  sidebarToggle.setAttribute("aria-expanded", String(!isCollapsed));
  sidebarToggle.setAttribute("aria-label", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
});

menuButton.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
document.querySelector("#sidebar-close").addEventListener("click", closeNavigation);
document.querySelector("#sidebar-scrim").addEventListener("click", closeNavigation);
document.querySelectorAll(".sidebar a").forEach((link) => link.addEventListener("click", closeNavigation));

document.querySelector("#theme-toggle").addEventListener("click", () => {
  showPage("settings");
});

folioModeToggle.addEventListener("click", () => {
  appearancePreferences.mode = resolvedAppearance() === "light" ? "dark" : "light";
  applyAppearance();
});

document.querySelector("#appearance-control").addEventListener("change", (event) => {
  if (!event.target.matches('input[name="appearance"]')) return;
  appearancePreferences.mode = event.target.value;
  applyAppearance();
});

document.querySelector("#theme-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-palette-option]");
  if (!button) return;
  appearancePreferences.palette = button.dataset.paletteOption;
  if (appearancePreferences.palette === "atlas") appearancePreferences.layout = "split";
  applyAppearance();
});

document.querySelector("#layout-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-layout-option]");
  if (!button) return;
  appearancePreferences.layout = button.dataset.layoutOption;
  applyAppearance();
});

folioAccent.addEventListener("input", () => {
  appearancePreferences.folioAccent = folioAccent.value;
  applyAppearance();
});

folioBackground.addEventListener("input", () => {
  const setting = resolvedAppearance() === "dark" ? "folioBackground" : "folioLightBackground";
  appearancePreferences[setting] = folioBackground.value;
  applyAppearance();
});

liquidGlassRange.addEventListener("input", () => {
  appearancePreferences.liquidGlass = Number(liquidGlassRange.value);
  applyAppearance();
});

liquidBackgroundGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-liquid-background]");
  if (!button) return;
  appearancePreferences.liquidBackground = button.dataset.liquidBackground;
  appearancePreferences.liquidBackgroundImage = "";
  appearancePreferences.liquidBackgroundName = "";
  liquidBackgroundUpload.value = "";
  applyAppearance();
});

liquidBackgroundUpload.addEventListener("change", () => {
  const [file] = liquidBackgroundUpload.files;
  if (!file) return;
  const supportedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/avif"]);
  if (!supportedTypes.has(file.type)) {
    liquidBackgroundUpload.value = "";
    showToast("Choose a PNG, JPEG, WebP, or AVIF image");
    return;
  }
  if (file.size > 1.5 * 1024 * 1024) {
    liquidBackgroundUpload.value = "";
    showToast("Background images must be 1.5 MB or smaller");
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = safeLiquidBackgroundImage(reader.result);
    if (!image) {
      showToast("That image could not be used");
      return;
    }
    appearancePreferences.liquidBackgroundImage = image;
    appearancePreferences.liquidBackgroundName = file.name;
    applyAppearance();
    showToast("Custom Liquid Glass background added");
  });
  reader.readAsDataURL(file);
});

liquidBackgroundClear.addEventListener("click", () => {
  appearancePreferences.liquidBackgroundImage = "";
  appearancePreferences.liquidBackgroundName = "";
  liquidBackgroundUpload.value = "";
  applyAppearance();
  showToast("Custom background removed");
});

liquidTint.addEventListener("input", () => {
  appearancePreferences.liquidTint = liquidTint.value;
  applyAppearance();
});

radiusRange.addEventListener("input", () => {
  appearancePreferences.radius = Number(radiusRange.value);
  applyAppearance();
});

boldToggle.addEventListener("change", () => {
  appearancePreferences.bold = boldToggle.checked;
  applyAppearance();
});

hoverInfoToggle.addEventListener("change", () => {
  appearancePreferences.moreInfo = hoverInfoToggle.checked;
  applyAppearance();
});

folioSearch.addEventListener("input", renderFolioDashboard);

document.querySelector(".folio-filter-row").addEventListener("click", (event) => {
  const button = event.target.closest("[data-folio-filter]");
  if (!button) return;
  activeFolioFilter = button.dataset.folioFilter;
  document.querySelectorAll("[data-folio-filter]").forEach((item) => item.classList.toggle("active", item === button));
  renderFolioDashboard();
});

folioToolList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-folio-tool]");
  if (!button) return;
  selectedFolioToolId = button.dataset.folioTool;
  renderFolioDashboard();
});

folioToolDetail.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) toggleSavedTool(saveButton.dataset.save);
});

function updateFolioPanelWidth(value) {
  const width = Math.min(48, Math.max(28, Math.round(Number(value))));
  folioPanels.style.setProperty("--folio-list", `${width}%`);
  folioPanelRange.value = String(width);
  folioPanelValue.textContent = `${width}%`;
  folioPanelDrag.setAttribute("aria-valuenow", String(width));
}

folioPanelRange.addEventListener("input", () => updateFolioPanelWidth(folioPanelRange.value));

let folioPanelDragging = false;
folioPanelDrag.addEventListener("pointerdown", (event) => {
  folioPanelDragging = true;
  folioPanelDrag.classList.add("dragging");
  folioPanelDrag.setPointerCapture(event.pointerId);
});
folioPanelDrag.addEventListener("pointermove", (event) => {
  if (!folioPanelDragging) return;
  const bounds = folioPanels.getBoundingClientRect();
  const fromLeft = (event.clientX - bounds.left) / bounds.width;
  const listShare = folioPanels.classList.contains("panels-swapped") ? 1 - fromLeft : fromLeft;
  updateFolioPanelWidth(listShare * 100);
});
const stopFolioPanelDrag = () => {
  folioPanelDragging = false;
  folioPanelDrag.classList.remove("dragging");
};
folioPanelDrag.addEventListener("pointerup", stopFolioPanelDrag);
folioPanelDrag.addEventListener("pointercancel", stopFolioPanelDrag);
folioPanelDrag.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(event.key)) return;
  event.preventDefault();
  const increase = event.key === "ArrowRight" || event.key === "ArrowUp";
  updateFolioPanelWidth(Number(folioPanelRange.value) + (increase ? 1 : -1));
});

document.querySelector("#folio-swap").addEventListener("click", () => {
  folioPanels.classList.toggle("panels-swapped");
});

document.querySelector("#folio-reset").addEventListener("click", () => {
  updateFolioPanelWidth(34);
  folioPanels.classList.remove("panels-swapped");
});

document.querySelector("#reset-settings").addEventListener("click", () => {
  appearancePreferences = { ...appearanceDefaults };
  liquidBackgroundUpload.value = "";
  applyAppearance();
  showToast("Appearance settings reset");
});

document.querySelector(".settings-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-reset-setting]");
  if (!button || button.disabled) return;
  const setting = button.dataset.resetSetting;
  if (!(setting in appearanceDefaults)) return;
  appearancePreferences[setting] = appearanceDefaults[setting];
  if (setting === "liquidBackground" || setting === "liquidBackgroundImage") {
    appearancePreferences.liquidBackgroundImage = "";
    appearancePreferences.liquidBackgroundName = "";
    liquidBackgroundUpload.value = "";
  }
  applyAppearance();
  const labels = { mode: "Appearance", palette: "Theme", layout: "Layout", radius: "Corner roundness", bold: "Typography", moreInfo: "Hover information", folioAccent: "Folio accent", folioBackground: "Folio dark background", folioLightBackground: "Folio light background", liquidGlass: "Glass intensity", liquidBackground: "Liquid background", liquidBackgroundImage: "Custom background", liquidTint: "Glass tint" };
  showToast(`${labels[setting]} reset`);
});

systemColorScheme.addEventListener("change", () => {
  if (appearancePreferences.mode === "system") applyAppearance({ save: false });
});

advancedBuilder.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(advancedBuilder);
  const values = {
    projectName: String(data.get("projectName") || "Untitled workflow").trim(),
    goal: String(data.get("goal") || "").trim(),
    input: String(data.get("input") || "Text or form responses"),
    delivery: String(data.get("delivery") || "Document or report"),
    automation: String(data.get("automation") || "assist"),
    budget: String(data.get("budget") || "free"),
    connections: data.getAll("connection").map(String),
    sensitive: data.get("sensitive") === "on"
  };
  if (values.goal.length < 15) {
    showToast("Add a little more detail to the workflow goal");
    document.querySelector("#advanced-goal").focus();
    return;
  }
  renderBlueprint(createBlueprint(values));
  blueprintOutput.scrollIntoView({ behavior: "smooth", block: "start" });
});

blueprintOutput.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-blueprint-action]");
  if (!actionButton || !blueprintOutput._blueprint) return;
  const blueprint = blueprintOutput._blueprint;
  if (actionButton.dataset.blueprintAction === "save") {
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem("ai-scouter-blueprints") || "[]"); } catch { saved = []; }
    saved.unshift(blueprint);
    localStorage.setItem("ai-scouter-blueprints", JSON.stringify(saved.slice(0, 20)));
    showToast("Blueprint saved in this browser");
  }
  if (actionButton.dataset.blueprintAction === "copy") {
    try {
      await navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
      showToast("Blueprint JSON copied");
    } catch {
      showToast("Clipboard access was blocked");
    }
  }
  if (actionButton.dataset.blueprintAction === "matcher") useTask(blueprint.goal);
});

window.addEventListener("hashchange", () => showPage(location.hash.slice(1) || "tools", false));
applyAppearance({ save: false });
showPage(location.hash.slice(1) || "tools", false);
