import { Menu, Minus, Puzzle, Square, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDen, type ViewId } from "@/lib/store";
import { useResolvedScheme } from "@/components/theme-root";

const TABS: { id: ViewId; label: string; path: string }[] = [
  { id: "habitat", label: "Habitat", path: "den://start" },
  { id: "studio", label: "Studio", path: "den://studio" },
  { id: "install", label: "Install", path: "den://install" },
];

export function ChromeBar() {
  const view = useDen((s) => s.view);
  const setView = useDen((s) => s.setView);
  const scheme = useDen((s) => s.scheme);
  const setScheme = useDen((s) => s.setScheme);
  const resolved = useResolvedScheme();
  const current = TABS.find((t) => t.id === view) ?? TABS[0];

  function cycleScheme() {
    const order = ["system", "dark", "light"] as const;
    const i = order.indexOf(scheme);
    setScheme(order[(i + 1) % order.length]);
  }

  return (
    <header className="flex h-11 w-full items-center gap-1 border-b border-surface px-2 sm:px-3">
      <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden" aria-label="Den">
        {TABS.map((tab) => {
          const selected = tab.id === view;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setView(tab.id)}
              className={cn(
                "relative h-11 shrink-0 px-3 text-sm transition-colors duration-[var(--motion-quick)] ease-[var(--ease-out)]",
                selected ? "text-accent" : "text-fg hover:text-tab-hover",
              )}
              aria-current={selected ? "page" : undefined}
            >
              {tab.label}
              {selected ? (
                <span className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-accent" />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="mx-2 hidden min-w-0 flex-[1.2] items-center justify-center md:flex">
        <div className="flex h-8 w-full max-w-md items-center rounded-row border border-surface bg-canvas px-3 font-mono text-xs text-muted">
          <span className="truncate">{current.path}</span>
        </div>
      </div>

      <div className="ml-auto flex items-center">
        <button
          type="button"
          onClick={cycleScheme}
          className="hidden h-11 px-3 text-xs text-fg transition-colors duration-[var(--motion-quick)] hover:text-accent sm:inline-flex sm:items-center"
          aria-label={`Colour scheme: ${scheme}`}
          title={`Scheme: ${scheme}${scheme === "system" ? ` (${resolved})` : ""}`}
        >
          {scheme === "system" ? "System" : scheme === "dark" ? "Dark" : "Light"}
        </button>
        <span className="hidden h-11 w-11 items-center justify-center text-fg sm:inline-flex" aria-hidden>
          <Puzzle className="size-4" />
        </span>
        <span className="hidden h-11 w-11 items-center justify-center text-fg sm:inline-flex" aria-hidden>
          <Menu className="size-4" />
        </span>
        <span className="hidden items-center md:flex" aria-hidden>
          <span className="inline-flex size-11 items-center justify-center text-fg">
            <Minus className="size-3.5" />
          </span>
          <span className="inline-flex size-11 items-center justify-center text-fg">
            <Square className="size-3" />
          </span>
          <span className="inline-flex size-11 items-center justify-center text-fg hover:text-danger">
            <X className="size-3.5" />
          </span>
        </span>
      </div>
    </header>
  );
}
