import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GRUVBOX, type Palette, type PalettePair } from "./palettes";
import { DEFAULT_LAYOUT, type FoxOneLayout } from "./foxone";
import type { SearchEngineId } from "./search";
import { uid } from "./utils";

export type ViewId = "habitat" | "studio" | "install";
export type SchemePref = "dark" | "light" | "system";

export type Shortcut = {
  id: string;
  name: string;
  url: string;
};

export type Task = {
  id: string;
  text: string;
  done: boolean;
};

export const DEFAULT_SHORTCUTS: Shortcut[] = [
  { id: "grok", name: "Grok", url: "https://grok.com" },
  { id: "github", name: "GitHub", url: "https://github.com" },
  { id: "wiki", name: "Wikipedia", url: "https://wikipedia.org" },
  { id: "mail", name: "Mail", url: "https://mail.google.com" },
  { id: "yt", name: "YouTube", url: "https://youtube.com" },
  { id: "maps", name: "Maps", url: "https://maps.google.com" },
];

type DenState = {
  hydrated: boolean;
  view: ViewId;
  scheme: SchemePref;
  presetId: string;
  palette: PalettePair;
  layout: FoxOneLayout;
  searchEngine: SearchEngineId;
  clock24: boolean;
  shortcuts: Shortcut[];
  tasks: Task[];
  note: string;
  setHydrated: (v: boolean) => void;
  setView: (view: ViewId) => void;
  setScheme: (scheme: SchemePref) => void;
  setPreset: (id: string, pair: PalettePair) => void;
  setColor: (scheme: "dark" | "light", key: keyof Palette, value: string) => void;
  setLayout: <K extends keyof FoxOneLayout>(key: K, value: FoxOneLayout[K]) => void;
  setSearchEngine: (id: SearchEngineId) => void;
  setClock24: (v: boolean) => void;
  addShortcut: (name: string, url: string) => void;
  updateShortcut: (id: string, patch: Partial<Pick<Shortcut, "name" | "url">>) => void;
  removeShortcut: (id: string) => void;
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  setNote: (note: string) => void;
  resetAll: () => void;
};

const initialData = {
  view: "habitat" as ViewId,
  scheme: "system" as SchemePref,
  presetId: "gruvbox",
  palette: GRUVBOX,
  layout: DEFAULT_LAYOUT,
  searchEngine: "ddg" as SearchEngineId,
  clock24: true,
  shortcuts: DEFAULT_SHORTCUTS,
  tasks: [] as Task[],
  note: "",
};

export const useDen = create<DenState>()(
  persist(
    (set) => ({
      hydrated: false,
      ...initialData,
      setHydrated: (hydrated) => set({ hydrated }),
      setView: (view) => set({ view }),
      setScheme: (scheme) => set({ scheme }),
      setPreset: (presetId, palette) => set({ presetId, palette }),
      setColor: (schemeKey, key, value) =>
        set((s) => ({
          presetId: "custom",
          palette: {
            ...s.palette,
            [schemeKey]: { ...s.palette[schemeKey], [key]: value },
          },
        })),
      setLayout: (key, value) =>
        set((s) => ({ layout: { ...s.layout, [key]: value } })),
      setSearchEngine: (searchEngine) => set({ searchEngine }),
      setClock24: (clock24) => set({ clock24 }),
      addShortcut: (name, url) =>
        set((s) => ({
          shortcuts: [...s.shortcuts, { id: uid(), name, url }],
        })),
      updateShortcut: (id, patch) =>
        set((s) => ({
          shortcuts: s.shortcuts.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeShortcut: (id) =>
        set((s) => ({ shortcuts: s.shortcuts.filter((x) => x.id !== id) })),
      addTask: (text) =>
        set((s) => ({
          tasks: [...s.tasks, { id: uid(), text, done: false }],
        })),
      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      setNote: (note) => set({ note }),
      resetAll: () => set({ ...initialData, hydrated: true }),
    }),
    {
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
        note: s.note,
      }),
    },
  ),
);
