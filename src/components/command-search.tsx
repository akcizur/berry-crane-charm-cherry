import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { filterShortcuts, resolveQuery } from "@/lib/search";
import { useDen } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CommandSearch() {
  const engine = useDen((s) => s.searchEngine);
  const shortcuts = useDen((s) => s.shortcuts);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const hits = useMemo(() => filterShortcuts(value, shortcuts).slice(0, 6), [value, shortcuts]);
  const primary = useMemo(() => resolveQuery(value, engine, shortcuts), [value, engine, shortcuts]);

  const items = useMemo(() => {
    const list: { href: string; label: string }[] = [];
    if (primary) list.push(primary);
    for (const s of hits) {
      if (primary && s.url === primary.href) continue;
      list.push({ href: s.url, label: s.name });
    }
    return list;
  }, [primary, hits]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "/" || (e.key === "l" && (e.ctrlKey || e.metaKey))) && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    if (mq.matches) inputRef.current?.focus();
  }, []);

  function go(href: string) {
    window.location.href = href;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const target = items[active] ?? primary;
    if (target) go(target.href);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="den-enter den-enter-1 relative mx-auto mt-6 w-full max-w-xl"
      role="search"
    >
      <label htmlFor="den-search" className="sr-only">
        Search or enter address
      </label>
      <input
        ref={inputRef}
        id="den-search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, Math.max(items.length - 1, 0)));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
          } else if (e.key === "Escape") {
            (e.target as HTMLInputElement).blur();
            setOpen(false);
          }
        }}
        placeholder="Search or enter address"
        autoComplete="off"
        className={cn(
          "h-12 w-full rounded-row border border-surface bg-canvas px-4 font-mono text-sm text-fg",
          "placeholder:text-faint transition-[border-color,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
          "hover:border-hover focus:border-accent focus:bg-surface focus:outline-none",
        )}
      />
      <p className="mt-2 hidden text-center font-mono text-xs text-faint sm:block">
        Press / or Ctrl+L · g, d, w, y, gh prefixes
      </p>
      {open && value.trim() && items.length > 0 ? (
        <ul
          className="absolute top-[calc(100%+4px)] z-20 w-full rounded-surface border border-surface bg-canvas py-1 shadow-[var(--den-shadow)]"
          role="listbox"
        >
          {items.map((item, i) => (
            <li key={`${item.href}-${item.label}`}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(item.href)}
                className={cn(
                  "flex h-10 w-full items-center justify-between gap-3 px-4 text-left text-sm",
                  i === active ? "text-accent" : "text-fg hover:text-accent",
                )}
                role="option"
                aria-selected={i === active}
              >
                <span className="truncate">{item.label}</span>
                <span className="truncate font-mono text-xs text-faint">{item.href.replace(/^https?:\/\//, "")}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
