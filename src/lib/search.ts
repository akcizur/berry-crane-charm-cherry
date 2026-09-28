export type SearchEngineId = "ddg" | "google" | "bing" | "kagi" | "startpage";

export const SEARCH_ENGINES: Record<
  SearchEngineId,
  { name: string; search: (q: string) => string }
> = {
  ddg: {
    name: "DuckDuckGo",
    search: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  },
  google: {
    name: "Google",
    search: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  bing: {
    name: "Bing",
    search: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  },
  kagi: {
    name: "Kagi",
    search: (q) => `https://kagi.com/search?q=${encodeURIComponent(q)}`,
  },
  startpage: {
    name: "Startpage",
    search: (q) => `https://www.startpage.com/sp/search?query=${encodeURIComponent(q)}`,
  },
};

const PREFIX: Record<string, (q: string) => string> = {
  g: SEARCH_ENGINES.google.search,
  d: SEARCH_ENGINES.ddg.search,
  y: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
  w: (q) => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`,
  gh: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`,
};

const LOOKS_LIKE_HOST = /^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i;

export type ShortcutHit = { id: string; name: string; url: string };

export function resolveQuery(
  raw: string,
  engine: SearchEngineId,
  shortcuts: ShortcutHit[] = [],
): { href: string; label: string } | null {
  const q = raw.trim();
  if (!q) return null;

  const exact = shortcuts.find(
    (s) => s.name.toLowerCase() === q.toLowerCase() || s.url.replace(/^https?:\/\//, "") === q,
  );
  if (exact) return { href: exact.url, label: `Open ${exact.name}` };

  const bang = q.match(/^(\w+)\s+(.+)$/);
  if (bang && PREFIX[bang[1]]) {
    return { href: PREFIX[bang[1]](bang[2]), label: `Search ${bang[1]}` };
  }

  if (/^https?:\/\//i.test(q)) return { href: q, label: "Go" };

  if (LOOKS_LIKE_HOST.test(q) && !q.includes(" ")) {
    return { href: `https://${q}`, label: "Go" };
  }

  return {
    href: SEARCH_ENGINES[engine].search(q),
    label: `Search ${SEARCH_ENGINES[engine].name}`,
  };
}

export function filterShortcuts(raw: string, shortcuts: ShortcutHit[]) {
  const q = raw.trim().toLowerCase();
  if (!q) return [];
  return shortcuts.filter(
    (s) => s.name.toLowerCase().includes(q) || s.url.toLowerCase().includes(q),
  );
}
