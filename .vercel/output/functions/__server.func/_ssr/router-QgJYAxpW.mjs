import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-QgJYAxpW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var GRUVBOX = {
	dark: {
		base: "#282828",
		surface: "#3c3836",
		accent: "#fabd2f",
		text: "#ffffff",
		hover: "#7c6f64",
		tabHover: "#ffda85"
	},
	light: {
		base: "#fbf1c7",
		surface: "#ebdbb2",
		accent: "#b57614",
		text: "#3c3836",
		hover: "#bdae93",
		tabHover: "#855d22"
	}
};
var PRESETS = [
	{
		id: "gruvbox",
		name: "Gruvbox",
		pair: GRUVBOX
	},
	{
		id: "nord",
		name: "Nord",
		pair: {
			dark: {
				base: "#2e3440",
				surface: "#3b4252",
				accent: "#88c0d0",
				text: "#eceff4",
				hover: "#4c566a",
				tabHover: "#8fbcbb"
			},
			light: {
				base: "#eceff4",
				surface: "#e5e9f0",
				accent: "#5e81ac",
				text: "#2e3440",
				hover: "#d8dee9",
				tabHover: "#81a1c1"
			}
		}
	},
	{
		id: "everforest",
		name: "Everforest",
		pair: {
			dark: {
				base: "#2b3339",
				surface: "#3a454a",
				accent: "#a7c080",
				text: "#d3c6aa",
				hover: "#4a555b",
				tabHover: "#dbbc7f"
			},
			light: {
				base: "#fdf6e3",
				surface: "#efebd4",
				accent: "#8da101",
				text: "#5c6a72",
				hover: "#e6e2cc",
				tabHover: "#dfa000"
			}
		}
	},
	{
		id: "tokyo",
		name: "Tokyo Night",
		pair: {
			dark: {
				base: "#1a1b26",
				surface: "#24283b",
				accent: "#7aa2f7",
				text: "#c0caf5",
				hover: "#414868",
				tabHover: "#89ddff"
			},
			light: {
				base: "#d5d6db",
				surface: "#e1e2e7",
				accent: "#34548a",
				text: "#343b58",
				hover: "#c4c8da",
				tabHover: "#166775"
			}
		}
	},
	{
		id: "kanagawa",
		name: "Kanagawa",
		pair: {
			dark: {
				base: "#1f1f28",
				surface: "#2a2a37",
				accent: "#e6c384",
				text: "#dcd7ba",
				hover: "#363646",
				tabHover: "#ffa066"
			},
			light: {
				base: "#f2ecbc",
				surface: "#e7dba0",
				accent: "#cc6d00",
				text: "#545464",
				hover: "#d5cea3",
				tabHover: "#b35b00"
			}
		}
	}
];
var DEFAULT_LAYOUT = {
	rounded: 0,
	borderRadius: 8,
	hideUrlbarButtons: 0,
	hideExtensionIcons: 1,
	dynamicBookmarks: 1,
	dynamicBookmarksNewtab: 1,
	extensionsButtonRight: 1,
	showAllTabsButton: 0,
	hideNavButtons: 0,
	showLoadingProgress: 0,
	containerLineTop: 1,
	autohideNavButtons: 0,
	tabMinWidth: 76
};
function setHex(css, name, value) {
	const re = new RegExp(`(${name}:\\s*)#[0-9A-Fa-f]{3,8}`, "g");
	return css.replace(re, `$1${value}`);
}
function setNum(css, name, value) {
	const re = new RegExp(`(${name}:\\s*)\\d+`, "g");
	return css.replace(re, `$1${value}`);
}
function setPx(css, name, value) {
	const re = new RegExp(`(${name}:\\s*)\\d+px`, "g");
	return css.replace(re, `$1${value}px`);
}
function setLightVar(css, name, value) {
	const re = new RegExp(`(${name}:\\s*)#[0-9A-Fa-f]{3,8}`, "g");
	return css.replace(re, `$1${value}`);
}
function applyLayout(css, layout) {
	let out = css;
	out = setNum(out, "--uc-rounded", String(layout.rounded));
	out = setPx(out, "--uc-border-radius", layout.borderRadius);
	out = setNum(out, "--uc-hide-urlbar-buttons", String(layout.hideUrlbarButtons));
	out = setNum(out, "--uc-hide-extension-icons", String(layout.hideExtensionIcons));
	out = setNum(out, "--uc-dynamic-bookmarks-newtab", String(layout.dynamicBookmarksNewtab));
	out = setNum(out, "--uc-dynamic-bookmarks", String(layout.dynamicBookmarks));
	out = setNum(out, "--uc-extensions-button-right", String(layout.extensionsButtonRight));
	out = setNum(out, "--uc-show-all-tabs-button", String(layout.showAllTabsButton));
	out = setNum(out, "--uc-hide-nav-buttons", String(layout.hideNavButtons));
	out = setNum(out, "--uc-show-loading-progress", String(layout.showLoadingProgress));
	out = setNum(out, "--uc-container-line-top", String(layout.containerLineTop));
	out = setNum(out, "--uc-autohide-nav-buttons", String(layout.autohideNavButtons));
	out = setPx(out, "--uc-tab-min-width", layout.tabMinWidth);
	return out;
}
function applyDarkHex(css, pair) {
	let out = css;
	out = setHex(out, "--uc-color-base", pair.dark.base);
	out = setHex(out, "--uc-color-surface", pair.dark.surface);
	out = setHex(out, "--uc-color-accent", pair.dark.accent);
	out = setHex(out, "--uc-color-text", pair.dark.text);
	out = setHex(out, "--uc-color-hover", pair.dark.hover);
	out = setHex(out, "--uc-tab-hover-text", pair.dark.tabHover);
	return out;
}
function applyLightVars(css, pair) {
	let out = css;
	out = setLightVar(out, "--uc-light-color-base", pair.light.base);
	out = setLightVar(out, "--uc-light-color-surface", pair.light.surface);
	out = setLightVar(out, "--uc-light-color-accent", pair.light.accent);
	out = setLightVar(out, "--uc-light-color-text", pair.light.text);
	out = setLightVar(out, "--uc-light-color-hover", pair.light.hover);
	out = setLightVar(out, "--uc-light-tab-hover-text", pair.light.tabHover);
	return out;
}
function applyFoxOneConfig(css, kind, pair, layout) {
	if (kind === "chrome") {
		let out = applyDarkHex(css, pair);
		out = applyLightVars(out, pair);
		return applyLayout(out, layout);
	}
	const lightBlock = css.match(/@media \(prefers-color-scheme: light\) \{[\s\S]*?\n\}/)?.[0];
	let out = lightBlock ? css.replace(lightBlock, "\0LIGHT\0") : css;
	out = applyDarkHex(out, pair);
	out = out.replace(/--newtab-background-color:\s*[^;]+/, `--newtab-background-color: ${pair.dark.base}`);
	out = out.replace(/--newtab-text-primary-color:\s*[^;]+/, `--newtab-text-primary-color: ${pair.dark.text}`);
	out = out.replace(/::selection \{\s*background-color:\s*[^;]+;\s*color:\s*[^;]+;/, `::selection {\n    background-color: ${pair.dark.accent} !important;\n    color: ${pair.dark.base} !important;`);
	out = applyLayout(out, layout);
	if (lightBlock) {
		let lb = lightBlock;
		lb = setHex(lb, "--uc-color-base", pair.light.base);
		lb = setHex(lb, "--uc-color-surface", pair.light.surface);
		lb = setHex(lb, "--uc-color-accent", pair.light.accent);
		lb = setHex(lb, "--uc-color-text", pair.light.text);
		lb = setHex(lb, "--uc-color-hover", pair.light.hover);
		lb = setHex(lb, "--uc-tab-hover-text", pair.light.tabHover);
		out = out.replace("\0LIGHT\0", lb);
	}
	return out;
}
function paletteSnippet(pair, layout) {
	return `/* Den — FoxOne 3.8.1 palette overlay
   Paste over the CONFIG colors in userChrome.css and the PALETTE block in userContent.css. */

:root {
  --uc-color-base:    ${pair.dark.base};
  --uc-color-surface: ${pair.dark.surface};
  --uc-color-accent:  ${pair.dark.accent};
  --uc-color-text:    ${pair.dark.text};
  --uc-color-hover:   ${pair.dark.hover};
  --uc-tab-hover-text: ${pair.dark.tabHover};

  --uc-light-color-base:    ${pair.light.base};
  --uc-light-color-surface: ${pair.light.surface};
  --uc-light-color-accent:  ${pair.light.accent};
  --uc-light-color-text:    ${pair.light.text};
  --uc-light-color-hover:   ${pair.light.hover};
  --uc-light-tab-hover-text: ${pair.light.tabHover};

  --uc-rounded: ${layout.rounded};
  --uc-border-radius: ${layout.borderRadius}px;
  --uc-hide-urlbar-buttons: ${layout.hideUrlbarButtons};
  --uc-hide-extension-icons: ${layout.hideExtensionIcons};
  --uc-dynamic-bookmarks: ${layout.dynamicBookmarks};
  --uc-dynamic-bookmarks-newtab: ${layout.dynamicBookmarksNewtab};
  --uc-extensions-button-right: ${layout.extensionsButtonRight};
  --uc-show-all-tabs-button: ${layout.showAllTabsButton};
  --uc-hide-nav-buttons: ${layout.hideNavButtons};
  --uc-show-loading-progress: ${layout.showLoadingProgress};
  --uc-container-line-top: ${layout.containerLineTop};
  --uc-autohide-nav-buttons: ${layout.autohideNavButtons};
  --uc-tab-min-width: ${layout.tabMinWidth}px;
}
`;
}
async function downloadPatchedCss(kind, pair, layout) {
	const path = kind === "chrome" ? "/foxone/userChrome.css" : "/foxone/userContent.css";
	const name = kind === "chrome" ? "userChrome.css" : "userContent.css";
	const patched = applyFoxOneConfig(await fetch(path).then((r) => {
		if (!r.ok) throw new Error(`Could not load ${name}`);
		return r.text();
	}), kind, pair, layout);
	const blob = new Blob([patched], { type: "text/css" });
	const href = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = href;
	a.download = name;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(href);
}
function downloadText(filename, text, mime = "text/plain") {
	const blob = new Blob([text], { type: mime });
	const href = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = href;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(href);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
var initialData = {
	view: "habitat",
	scheme: "system",
	presetId: "gruvbox",
	palette: GRUVBOX,
	layout: DEFAULT_LAYOUT,
	searchEngine: "ddg",
	clock24: true,
	shortcuts: [
		{
			id: "grok",
			name: "Grok",
			url: "https://grok.com"
		},
		{
			id: "github",
			name: "GitHub",
			url: "https://github.com"
		},
		{
			id: "wiki",
			name: "Wikipedia",
			url: "https://wikipedia.org"
		},
		{
			id: "mail",
			name: "Mail",
			url: "https://mail.google.com"
		},
		{
			id: "yt",
			name: "YouTube",
			url: "https://youtube.com"
		},
		{
			id: "maps",
			name: "Maps",
			url: "https://maps.google.com"
		}
	],
	tasks: [],
	note: ""
};
var useDen = create()(persist((set) => ({
	hydrated: false,
	...initialData,
	setHydrated: (hydrated) => set({ hydrated }),
	setView: (view) => set({ view }),
	setScheme: (scheme) => set({ scheme }),
	setPreset: (presetId, palette) => set({
		presetId,
		palette
	}),
	setColor: (schemeKey, key, value) => set((s) => ({
		presetId: "custom",
		palette: {
			...s.palette,
			[schemeKey]: {
				...s.palette[schemeKey],
				[key]: value
			}
		}
	})),
	setLayout: (key, value) => set((s) => ({ layout: {
		...s.layout,
		[key]: value
	} })),
	setSearchEngine: (searchEngine) => set({ searchEngine }),
	setClock24: (clock24) => set({ clock24 }),
	addShortcut: (name, url) => set((s) => ({ shortcuts: [...s.shortcuts, {
		id: uid(),
		name,
		url
	}] })),
	updateShortcut: (id, patch) => set((s) => ({ shortcuts: s.shortcuts.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeShortcut: (id) => set((s) => ({ shortcuts: s.shortcuts.filter((x) => x.id !== id) })),
	addTask: (text) => set((s) => ({ tasks: [...s.tasks, {
		id: uid(),
		text,
		done: false
	}] })),
	toggleTask: (id) => set((s) => ({ tasks: s.tasks.map((t) => t.id === id ? {
		...t,
		done: !t.done
	} : t) })),
	removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
	setNote: (note) => set({ note }),
	resetAll: () => set({
		...initialData,
		hydrated: true
	})
}), {
	name: "den-habitat-v1",
	skipHydration: true,
	partialize: (s) => ({
		view: s.view,
		scheme: s.scheme,
		presetId: s.presetId,
		palette: s.palette,
		layout: s.layout,
		searchEngine: s.searchEngine,
		clock24: s.clock24,
		shortcuts: s.shortcuts,
		tasks: s.tasks,
		note: s.note
	})
}));
function subscribeScheme(onStoreChange) {
	const mq = window.matchMedia("(prefers-color-scheme: light)");
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}
function getLight() {
	return window.matchMedia("(prefers-color-scheme: light)").matches;
}
function useResolvedScheme() {
	const pref = useDen((s) => s.scheme);
	const systemLight = (0, import_react.useSyncExternalStore)(subscribeScheme, getLight, () => false);
	if (pref === "system") return systemLight ? "light" : "dark";
	return pref;
}
function ThemeRoot({ children }) {
	const palette = useDen((s) => s.palette);
	const layout = useDen((s) => s.layout);
	const scheme = useResolvedScheme();
	const colors = palette[scheme];
	(0, import_react.useEffect)(() => {
		useDen.persist.rehydrate();
		useDen.setState({ hydrated: true });
	}, []);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.dataset.scheme = scheme;
		root.style.setProperty("--den-canvas", colors.base);
		root.style.setProperty("--den-surface", colors.surface);
		root.style.setProperty("--den-accent", colors.accent);
		root.style.setProperty("--den-text", colors.text);
		root.style.setProperty("--den-hover", colors.hover);
		root.style.setProperty("--den-tab-hover", colors.tabHover);
		root.style.setProperty("--den-rounded", String(layout.rounded));
		root.style.setProperty("--den-border-radius", `${layout.borderRadius}px`);
		const meta = document.querySelector("meta[name=\"theme-color\"]");
		if (meta) meta.setAttribute("content", colors.base);
	}, [
		colors,
		layout.rounded,
		layout.borderRadius,
		scheme
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		position: "bottom-center",
		theme: scheme,
		toastOptions: { className: "!bg-canvas !text-fg !border-surface !rounded-surface" }
	})] });
}
var styles_default = "/assets/styles-DmkhHfRP.css";
var APP_NAME = "Den";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "A quieter startpage for FoxOne — Gruvbox habitat, command search, and a live Firefox theme studio."
			},
			{
				name: "theme-color",
				content: "#282828"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeRoot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter = () => import("./routes-CAmBQngw.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { downloadPatchedCss as a, PRESETS as c, cn as i, useResolvedScheme as n, downloadText as o, useDen as r, paletteSnippet as s, router_exports as t };
