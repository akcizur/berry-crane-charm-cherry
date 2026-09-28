import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Puzzle, c as Pencil, d as Check, i as Square, l as Minus, o as Plus, r as Trash2, s as Play, t as X, u as Menu } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as downloadPatchedCss, c as PRESETS, i as cn, n as useResolvedScheme, o as downloadText, r as useDen, s as paletteSnippet } from "./router-QgJYAxpW.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CAmBQngw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "habitat",
		label: "Habitat",
		path: "den://start"
	},
	{
		id: "studio",
		label: "Studio",
		path: "den://studio"
	},
	{
		id: "install",
		label: "Install",
		path: "den://install"
	}
];
function ChromeBar() {
	const view = useDen((s) => s.view);
	const setView = useDen((s) => s.setView);
	const scheme = useDen((s) => s.scheme);
	const setScheme = useDen((s) => s.setScheme);
	const resolved = useResolvedScheme();
	const current = TABS.find((t) => t.id === view) ?? TABS[0];
	function cycleScheme() {
		const order = [
			"system",
			"dark",
			"light"
		];
		const i = order.indexOf(scheme);
		setScheme(order[(i + 1) % order.length]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-11 w-full items-center gap-1 border-b border-surface px-2 sm:px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
				"aria-label": "Den",
				children: TABS.map((tab) => {
					const selected = tab.id === view;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setView(tab.id),
						className: cn("relative h-11 shrink-0 px-3 text-sm transition-colors duration-[var(--motion-quick)] ease-[var(--ease-out)]", selected ? "text-accent" : "text-fg hover:text-tab-hover"),
						"aria-current": selected ? "page" : void 0,
						children: [tab.label, selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-x-3 bottom-0 h-px bg-accent" }) : null]
					}, tab.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-2 hidden min-w-0 flex-[1.2] items-center justify-center md:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-8 w-full max-w-md items-center rounded-row border border-surface bg-canvas px-3 font-mono text-xs text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: current.path
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: cycleScheme,
						className: "hidden h-11 px-3 text-xs text-fg transition-colors duration-[var(--motion-quick)] hover:text-accent sm:inline-flex sm:items-center",
						"aria-label": `Colour scheme: ${scheme}`,
						title: `Scheme: ${scheme}${scheme === "system" ? ` (${resolved})` : ""}`,
						children: scheme === "system" ? "System" : scheme === "dark" ? "Dark" : "Light"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden h-11 w-11 items-center justify-center text-fg sm:inline-flex",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Puzzle, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden h-11 w-11 items-center justify-center text-fg sm:inline-flex",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden items-center md:flex",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex size-11 items-center justify-center text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex size-11 items-center justify-center text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex size-11 items-center justify-center text-fg hover:text-danger",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})
						]
					})
				]
			})
		]
	});
}
function parts(now, clock24) {
	return {
		time: new Intl.DateTimeFormat(void 0, {
			hour: "2-digit",
			minute: "2-digit",
			hour12: !clock24
		}).format(now),
		date: new Intl.DateTimeFormat(void 0, {
			weekday: "long",
			day: "numeric",
			month: "long"
		}).format(now),
		dateShort: new Intl.DateTimeFormat(void 0, {
			weekday: "short",
			day: "numeric",
			month: "short"
		}).format(now)
	};
}
function Clock() {
	const clock24 = useDen((s) => s.clock24);
	const setClock24 = useDen((s) => s.setClock24);
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const { time, date, dateShort } = parts(now, clock24);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "den-enter w-full text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 text-sm tracking-[0.18em] text-muted uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden whitespace-nowrap sm:inline",
				children: date
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "whitespace-nowrap sm:hidden",
				children: dateShort
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setClock24(!clock24),
			className: "font-mono text-clock leading-none font-normal tracking-[-0.04em] text-fg whitespace-nowrap tabular-nums",
			"aria-label": "Toggle 12 or 24 hour clock",
			title: "Toggle 12 / 24 hour",
			children: time
		})]
	});
}
var SEARCH_ENGINES = {
	ddg: {
		name: "DuckDuckGo",
		search: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`
	},
	google: {
		name: "Google",
		search: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`
	},
	bing: {
		name: "Bing",
		search: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`
	},
	kagi: {
		name: "Kagi",
		search: (q) => `https://kagi.com/search?q=${encodeURIComponent(q)}`
	},
	startpage: {
		name: "Startpage",
		search: (q) => `https://www.startpage.com/sp/search?query=${encodeURIComponent(q)}`
	}
};
var PREFIX = {
	g: SEARCH_ENGINES.google.search,
	d: SEARCH_ENGINES.ddg.search,
	y: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
	w: (q) => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`,
	gh: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`
};
var LOOKS_LIKE_HOST = /^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i;
function resolveQuery(raw, engine, shortcuts = []) {
	const q = raw.trim();
	if (!q) return null;
	const exact = shortcuts.find((s) => s.name.toLowerCase() === q.toLowerCase() || s.url.replace(/^https?:\/\//, "") === q);
	if (exact) return {
		href: exact.url,
		label: `Open ${exact.name}`
	};
	const bang = q.match(/^(\w+)\s+(.+)$/);
	if (bang && PREFIX[bang[1]]) return {
		href: PREFIX[bang[1]](bang[2]),
		label: `Search ${bang[1]}`
	};
	if (/^https?:\/\//i.test(q)) return {
		href: q,
		label: "Go"
	};
	if (LOOKS_LIKE_HOST.test(q) && !q.includes(" ")) return {
		href: `https://${q}`,
		label: "Go"
	};
	return {
		href: SEARCH_ENGINES[engine].search(q),
		label: `Search ${SEARCH_ENGINES[engine].name}`
	};
}
function filterShortcuts(raw, shortcuts) {
	const q = raw.trim().toLowerCase();
	if (!q) return [];
	return shortcuts.filter((s) => s.name.toLowerCase().includes(q) || s.url.toLowerCase().includes(q));
}
function CommandSearch() {
	const engine = useDen((s) => s.searchEngine);
	const shortcuts = useDen((s) => s.shortcuts);
	const [value, setValue] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(0);
	const inputRef = (0, import_react.useRef)(null);
	const hits = (0, import_react.useMemo)(() => filterShortcuts(value, shortcuts).slice(0, 6), [value, shortcuts]);
	const primary = (0, import_react.useMemo)(() => resolveQuery(value, engine, shortcuts), [
		value,
		engine,
		shortcuts
	]);
	const items = (0, import_react.useMemo)(() => {
		const list = [];
		if (primary) list.push(primary);
		for (const s of hits) {
			if (primary && s.url === primary.href) continue;
			list.push({
				href: s.url,
				label: s.name
			});
		}
		return list;
	}, [primary, hits]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			const tag = e.target?.tagName;
			const typing = tag === "INPUT" || tag === "TEXTAREA";
			if ((e.key === "/" || e.key === "l" && (e.ctrlKey || e.metaKey)) && !typing) {
				e.preventDefault();
				inputRef.current?.focus();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(min-width: 640px)").matches) inputRef.current?.focus();
	}, []);
	function go(href) {
		window.location.href = href;
	}
	function onSubmit(e) {
		e.preventDefault();
		const target = items[active] ?? primary;
		if (target) go(target.href);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "den-enter den-enter-1 relative mx-auto mt-6 w-full max-w-xl",
		role: "search",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "den-search",
				className: "sr-only",
				children: "Search or enter address"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				id: "den-search",
				value,
				onChange: (e) => {
					setValue(e.target.value);
					setOpen(true);
					setActive(0);
				},
				onFocus: () => setOpen(true),
				onBlur: () => window.setTimeout(() => setOpen(false), 120),
				onKeyDown: (e) => {
					if (e.key === "ArrowDown") {
						e.preventDefault();
						setActive((i) => Math.min(i + 1, Math.max(items.length - 1, 0)));
					} else if (e.key === "ArrowUp") {
						e.preventDefault();
						setActive((i) => Math.max(i - 1, 0));
					} else if (e.key === "Escape") {
						e.target.blur();
						setOpen(false);
					}
				},
				placeholder: "Search or enter address",
				autoComplete: "off",
				className: cn("h-12 w-full rounded-row border border-surface bg-canvas px-4 font-mono text-sm text-fg", "placeholder:text-faint transition-[border-color,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:border-hover focus:border-accent focus:bg-surface focus:outline-none")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 hidden text-center font-mono text-xs text-faint sm:block",
				children: "Press / or Ctrl+L · g, d, w, y, gh prefixes"
			}),
			open && value.trim() && items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "absolute top-[calc(100%+4px)] z-20 w-full rounded-surface border border-surface bg-canvas py-1 shadow-[var(--den-shadow)]",
				role: "listbox",
				children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => go(item.href),
					className: cn("flex h-10 w-full items-center justify-between gap-3 px-4 text-left text-sm", i === active ? "text-accent" : "text-fg hover:text-accent"),
					role: "option",
					"aria-selected": i === active,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-mono text-xs text-faint",
						children: item.href.replace(/^https?:\/\//, "")
					})]
				}) }, `${item.href}-${item.label}`))
			}) : null
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium select-none rounded-row transition-[color,background-color,opacity,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			ghost: "bg-transparent text-fg hover:bg-transparent hover:text-accent",
			primary: "bg-accent text-canvas hover:opacity-90",
			outline: "border border-surface bg-transparent text-fg hover:border-accent hover:text-accent"
		},
		size: {
			sm: "h-9 px-3 text-sm",
			md: "h-11 px-4 text-sm",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "ghost",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var STEPS = [
	{
		n: "01",
		title: "Allow user styles",
		body: "In the address bar open about:config. Search for toolkit.legacyUserProfileCustomizations.stylesheets and set it to true."
	},
	{
		n: "02",
		title: "Open your profile",
		body: "Help → More troubleshooting information → Profile Folder → Open Folder. Create a folder named chrome if it is not already there."
	},
	{
		n: "03",
		title: "Drop the sheets",
		body: "Download both files from Studio and place userChrome.css and userContent.css inside that chrome folder, replacing older copies."
	},
	{
		n: "04",
		title: "Restart Firefox",
		body: "Fully quit and reopen. The one-line chrome and Gruvbox surfaces should land immediately. Private windows follow the same files."
	}
];
function Install() {
	const setView = useDen((s) => s.setView);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "den-enter mx-auto w-full max-w-2xl px-4 py-8 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs tracking-[0.18em] text-muted uppercase",
				children: "FoxOne 3.8.1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-display font-medium tracking-tight text-fg",
				children: "Install"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-pretty text-muted",
				children: "Den exports a patched FoxOne theme — the same one-line layout, with your Studio palette. Firefox does not load chrome CSS until the preference below is on."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-10 flex flex-col gap-8",
				children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[3rem_1fr] gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-sm text-accent tabular-nums",
						children: s.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium text-fg",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-pretty text-muted",
						children: s.body
					})] })]
				}, s.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					onClick: () => setView("studio"),
					children: "Open Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setView("habitat"),
					children: "Back to Habitat"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-12 text-sm text-muted",
				children: "FoxOne is based on Cascade and LittleFox, MIT licensed. Den only recolours and packages it — keep the original comments in the sheet if you upstream a change."
			})
		]
	});
}
var Dialog = Dialog$1;
function DialogContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-canvas/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2", "rounded-surface border border-surface bg-canvas p-5 text-fg shadow-[var(--den-shadow)]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "size-9",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})
			})]
		}), children]
	})] });
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-row border border-surface bg-canvas px-3 text-sm text-fg", "placeholder:text-faint transition-[border-color,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:border-hover focus:border-accent focus:bg-surface focus:outline-none", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("w-full resize-none rounded-row border border-surface bg-canvas px-3 py-2 text-sm text-fg", "placeholder:text-faint transition-[border-color,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:border-hover focus:border-accent focus:bg-surface focus:outline-none", className),
		...props
	});
}
function mark(name) {
	return (name.replace(/[^a-zA-Z0-9]/g, "").charAt(0) || "?").toUpperCase();
}
function normalizeUrl(raw) {
	const t = raw.trim();
	if (!t) return "";
	if (/^https?:\/\//i.test(t)) return t;
	return `https://${t}`;
}
function Shortcuts() {
	const shortcuts = useDen((s) => s.shortcuts);
	const addShortcut = useDen((s) => s.addShortcut);
	const updateShortcut = useDen((s) => s.updateShortcut);
	const removeShortcut = useDen((s) => s.removeShortcut);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	function startAdd() {
		setEditId(null);
		setName("");
		setUrl("");
		setOpen(true);
	}
	function startEdit(id, n, u) {
		setEditId(id);
		setName(n);
		setUrl(u);
		setOpen(true);
	}
	function save() {
		const n = name.trim();
		const u = normalizeUrl(url);
		if (!n || !u) {
			toast("Name and address are required");
			return;
		}
		if (editId) updateShortcut(editId, {
			name: n,
			url: u
		});
		else addShortcut(n, u);
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "den-enter den-enter-2 mx-auto mt-8 w-full max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs tracking-[0.16em] text-muted uppercase",
					children: "Places"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setEditing((v) => !v),
						"aria-pressed": editing,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), editing ? "Done" : "Edit"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: startAdd,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-wrap justify-center gap-2",
				children: shortcuts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "relative",
					children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => startEdit(s.id, s.name, s.url),
							className: "flex h-11 items-center gap-2 rounded-row px-3 text-sm text-fg hover:text-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex size-6 items-center justify-center border border-surface font-mono text-xs",
								children: mark(s.name)
							}), s.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => removeShortcut(s.id),
							className: "inline-flex size-11 items-center justify-center text-muted hover:text-danger",
							"aria-label": `Remove ${s.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: s.url,
						className: "flex h-11 items-center gap-2 rounded-row px-3 text-sm text-fg hover:text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex size-6 items-center justify-center border border-surface font-mono text-xs",
							children: mark(s.name)
						}), s.name]
					})
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: editId ? "Edit place" : "New place",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs tracking-[0.14em] text-muted uppercase",
								children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-1.5",
									value: name,
									onChange: (e) => setName(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs tracking-[0.14em] text-muted uppercase",
								children: ["Address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-1.5",
									value: url,
									onChange: (e) => setUrl(e.target.value),
									placeholder: "https://",
									onKeyDown: (e) => {
										if (e.key === "Enter") save();
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								onClick: save,
								className: "mt-1",
								children: "Save"
							})
						]
					})
				})
			})
		]
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-px w-full grow overflow-hidden bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-row border border-accent bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-row border border-surface bg-canvas", "transition-[background-color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "data-[state=checked]:border-accent data-[state=checked]:bg-accent", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("block size-4 rounded-row bg-fg transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", "translate-x-1 data-[state=checked]:translate-x-5 data-[state=checked]:bg-canvas") })
	});
}
var COLOR_FIELDS = [
	{
		key: "base",
		label: "Base"
	},
	{
		key: "surface",
		label: "Surface"
	},
	{
		key: "accent",
		label: "Accent"
	},
	{
		key: "text",
		label: "Text"
	},
	{
		key: "hover",
		label: "Hover"
	},
	{
		key: "tabHover",
		label: "Tab hover"
	}
];
function HexField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid grid-cols-[1fr_auto_6.5rem] items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-fg",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "color",
				value,
				onChange: (e) => onChange(e.target.value),
				className: "size-9 cursor-pointer rounded-row border border-surface bg-canvas p-0",
				"aria-label": `${label} colour`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value,
				onChange: (e) => {
					const v = e.target.value;
					if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
				},
				onBlur: () => {
					if (!/^#[0-9A-Fa-f]{6}$/.test(value)) onChange("#282828");
				},
				className: "h-9 font-mono text-xs",
				spellCheck: false
			})
		]
	});
}
function ToggleRow({ label, hint, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-fg",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: hint
		}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange
		})]
	});
}
function Studio() {
	const presetId = useDen((s) => s.presetId);
	const palette = useDen((s) => s.palette);
	const layout = useDen((s) => s.layout);
	const searchEngine = useDen((s) => s.searchEngine);
	const setPreset = useDen((s) => s.setPreset);
	const setColor = useDen((s) => s.setColor);
	const setLayout = useDen((s) => s.setLayout);
	const setSearchEngine = useDen((s) => s.setSearchEngine);
	const resetAll = useDen((s) => s.resetAll);
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function download(kind) {
		setBusy(kind);
		try {
			await downloadPatchedCss(kind, palette, layout);
			toast(`Saved ${kind === "chrome" ? "userChrome.css" : "userContent.css"}`);
		} catch (err) {
			toast(err instanceof Error ? err.message : "Download failed");
		} finally {
			setBusy(null);
		}
	}
	function copySnippet() {
		const text = paletteSnippet(palette, layout);
		navigator.clipboard.writeText(text).then(() => toast("Palette snippet copied"), () => {
			downloadText("foxone-palette.css", text, "text/css");
			toast("Clipboard blocked — downloaded instead");
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "den-enter mx-auto w-full max-w-5xl px-4 py-8 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-10 max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs tracking-[0.18em] text-muted uppercase",
					children: "FoxOne 3.8.1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display font-medium tracking-tight text-fg",
					children: "Studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-pretty text-muted",
					children: "Recolour the habitat and export a patched FoxOne sheet. Accent is a text colour — hover a tab in the bar above to see the cue."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-[1fr_20rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-xs tracking-[0.16em] text-muted uppercase",
						children: "Presets"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1",
						children: [PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setPreset(p.id, p.pair),
							className: cn(presetId === p.id && "text-accent"),
							children: p.name
						}, p.id)), presetId === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-9 items-center px-3 text-sm text-accent",
							children: "Custom"
						}) : null]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-8 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-xs tracking-[0.16em] text-muted uppercase",
							children: "Dark"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-3",
							children: COLOR_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HexField, {
								label: f.label,
								value: palette.dark[f.key],
								onChange: (v) => {
									if (/^#[0-9A-Fa-f]{6}$/.test(v)) setColor("dark", f.key, v);
								}
							}, f.key))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-xs tracking-[0.16em] text-muted uppercase",
							children: "Light"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-3",
							children: COLOR_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HexField, {
								label: f.label,
								value: palette.light[f.key],
								onChange: (v) => {
									if (/^#[0-9A-Fa-f]{6}$/.test(v)) setColor("light", f.key, v);
								}
							}, `l-${f.key}`))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-xs tracking-[0.16em] text-muted uppercase",
							children: "Shape"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Rounded corners",
							hint: "FoxOne default is square. On uses the radius below.",
							checked: layout.rounded === 1,
							onChange: (v) => setLayout("rounded", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Radius" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-muted tabular-nums",
									children: [layout.borderRadius, "px"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 4,
								max: 16,
								step: 1,
								value: [layout.borderRadius],
								onValueChange: ([v]) => setLayout("borderRadius", v ?? 8)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tab min width" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-muted tabular-nums",
									children: [layout.tabMinWidth, "px"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 36,
								max: 120,
								step: 2,
								value: [layout.tabMinWidth],
								onValueChange: ([v]) => setLayout("tabMinWidth", v ?? 76)
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-xs tracking-[0.16em] text-muted uppercase",
							children: "Chrome"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Hide URL-bar icons",
							hint: "Shield, reader, star — no misclicks.",
							checked: layout.hideUrlbarButtons === 1,
							onChange: (v) => setLayout("hideUrlbarButtons", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Hide extension icons",
							hint: "Reveal on hamburger hover.",
							checked: layout.hideExtensionIcons === 1,
							onChange: (v) => setLayout("hideExtensionIcons", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Puzzle button on the right",
							checked: layout.extensionsButtonRight === 1,
							onChange: (v) => setLayout("extensionsButtonRight", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Dynamic bookmarks bar",
							hint: "Overlays on URL-bar hover.",
							checked: layout.dynamicBookmarks === 1,
							onChange: (v) => setLayout("dynamicBookmarks", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Bookmarks on fresh tabs",
							checked: layout.dynamicBookmarksNewtab === 1,
							onChange: (v) => setLayout("dynamicBookmarksNewtab", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Hide back / forward / reload",
							checked: layout.hideNavButtons === 1,
							onChange: (v) => setLayout("hideNavButtons", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Show all-tabs button",
							checked: layout.showAllTabsButton === 1,
							onChange: (v) => setLayout("showAllTabsButton", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Tab loading bar",
							checked: layout.showLoadingProgress === 1,
							onChange: (v) => setLayout("showLoadingProgress", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
							label: "Container line on top",
							checked: layout.containerLineTop === 1,
							onChange: (v) => setLayout("containerLineTop", v ? 1 : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: "Auto-hide nav buttons"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "0 always · 1 hover+focus · 2 hover"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "h-11 rounded-row border border-surface bg-canvas px-3 text-sm text-fg",
								value: layout.autohideNavButtons,
								onChange: (e) => setLayout("autohideNavButtons", Number(e.target.value)),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 0,
										children: "Off"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 1,
										children: "Hover and focus"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 2,
										children: "Hover"
									})
								]
							})]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex h-fit flex-col gap-6 rounded-surface border border-surface p-5 lg:sticky lg:top-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-xs tracking-[0.16em] text-muted uppercase",
							children: "Export"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 text-sm text-pretty text-muted",
							children: "Patches FoxOne 3.8.1 with this palette. Drop the files into your profile chrome folder."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "primary",
									onClick: () => void download("chrome"),
									disabled: busy !== null,
									children: busy === "chrome" ? "Preparing…" : "Download userChrome.css"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => void download("content"),
									disabled: busy !== null,
									children: busy === "content" ? "Preparing…" : "Download userContent.css"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: copySnippet,
									children: "Copy palette snippet"
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-xs tracking-[0.16em] text-muted uppercase",
						children: "Search engine"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-11 w-full rounded-row border border-surface bg-canvas px-3 text-sm text-fg",
						value: searchEngine,
						onChange: (e) => setSearchEngine(e.target.value),
						children: Object.keys(SEARCH_ENGINES).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: id,
							children: SEARCH_ENGINES[id].name
						}, id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							resetAll();
							toast("Restored FoxOne Gruvbox");
						},
						children: "Reset Den"
					})
				]
			})]
		})]
	});
}
function Panel({ title, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex min-h-40 flex-col rounded-surface border border-surface bg-canvas p-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-4 text-xs tracking-[0.16em] text-muted uppercase",
			children: title
		}), children]
	});
}
function Today() {
	const tasks = useDen((s) => s.tasks);
	const addTask = useDen((s) => s.addTask);
	const toggleTask = useDen((s) => s.toggleTask);
	const removeTask = useDen((s) => s.removeTask);
	const [draft, setDraft] = (0, import_react.useState)("");
	const remaining = tasks.filter((t) => !t.done).length;
	function submit() {
		const t = draft.trim();
		if (!t) return;
		addTask(t);
		setDraft("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: `Today${tasks.length ? ` · ${remaining}` : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "mb-3",
			onSubmit: (e) => {
				e.preventDefault();
				submit();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				placeholder: "Add a task",
				"aria-label": "New task"
			})
		}), tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Nothing queued. Type above and press Enter."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-1 overflow-y-auto",
			children: tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "group flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => toggleTask(t.id),
					className: cn("flex min-h-11 flex-1 items-center gap-3 px-1 text-left text-sm", t.done ? "text-muted line-through" : "text-fg hover:text-accent"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex size-4 shrink-0 items-center justify-center border", t.done ? "border-accent bg-accent text-canvas" : "border-hover"),
						"aria-hidden": true,
						children: t.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : null
					}), t.text]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => removeTask(t.id),
					className: "inline-flex size-11 items-center justify-center text-faint hover:text-danger",
					"aria-label": `Remove ${t.text}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
				})]
			}, t.id))
		})]
	});
}
function Scratch() {
	const note = useDen((s) => s.note);
	const setNote = useDen((s) => s.setNote);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Scratch",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			value: note,
			onChange: (e) => setNote(e.target.value),
			placeholder: "A line, a thought, a link.",
			className: "min-h-24 flex-1",
			"aria-label": "Scratch pad"
		})
	});
}
var WORK_SEC = 1500;
var BREAK_SEC = 300;
function beep() {
	try {
		const ctx = new AudioContext();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.frequency.value = 784;
		osc.type = "sine";
		gain.gain.value = .05;
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + .18);
		window.setTimeout(() => void ctx.close(), 400);
	} catch {}
}
function fmt(sec) {
	const s = Math.max(0, Math.ceil(sec));
	const m = Math.floor(s / 60);
	const r = s % 60;
	return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function FocusTimer() {
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [remaining, setRemaining] = (0, import_react.useState)(WORK_SEC);
	const endsAt = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!endsAt.current) return;
		const id = window.setInterval(() => {
			if (!endsAt.current) return;
			const left = (endsAt.current - Date.now()) / 1e3;
			if (left <= 0) {
				endsAt.current = null;
				beep();
				if (phase === "work") {
					setPhase("break");
					setRemaining(BREAK_SEC);
				} else {
					setPhase("idle");
					setRemaining(WORK_SEC);
				}
			} else setRemaining(left);
		}, 200);
		return () => window.clearInterval(id);
	}, [phase]);
	function start() {
		const dur = phase === "break" ? remaining || BREAK_SEC : remaining || WORK_SEC;
		const next = phase === "idle" ? "work" : phase;
		endsAt.current = Date.now() + dur * 1e3;
		setPhase(next);
	}
	function pause() {
		endsAt.current = null;
	}
	function reset() {
		endsAt.current = null;
		setPhase("idle");
		setRemaining(WORK_SEC);
	}
	const running = endsAt.current !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Focus",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-xs tracking-[0.14em] text-muted uppercase",
				children: phase === "break" ? "Break" : phase === "work" ? "Focus" : "Ready"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-4xl tracking-tight text-fg tabular-nums",
				children: fmt(remaining)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex gap-2 pt-6",
				children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: pause,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5" }), "Pause"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					onClick: start,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), phase === "idle" ? "Start" : "Resume"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: reset,
					children: "Reset"
				})]
			})
		]
	});
}
function Widgets() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "den-enter den-enter-3 mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Today, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scratch, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTimer, {})
		]
	});
}
function Habitat() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col items-center px-4 pt-6 pb-8 sm:pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSearch, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shortcuts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Widgets, {})
		]
	});
}
function Home() {
	const view = useDen((s) => s.view);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-canvas text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "den-grain",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeBar, {}),
			view === "habitat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Habitat, {}) : null,
			view === "studio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {}) : null,
			view === "install" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Install, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex items-center justify-between gap-4 border-t border-surface px-4 py-3 text-xs text-faint",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Den" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono",
					children: "FoxOne habitat"
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
