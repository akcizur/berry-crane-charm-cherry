import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { Toaster } from "sonner";
import { useDen } from "@/lib/store";

function subscribeScheme(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getLight() {
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

export function useResolvedScheme(): "dark" | "light" {
  const pref = useDen((s) => s.scheme);
  const systemLight = useSyncExternalStore(subscribeScheme, getLight, () => false);
  if (pref === "system") return systemLight ? "light" : "dark";
  return pref;
}

export function ThemeRoot({ children }: { children: ReactNode }) {
  const palette = useDen((s) => s.palette);
  const layout = useDen((s) => s.layout);
  const scheme = useResolvedScheme();
  const colors = palette[scheme];

  useEffect(() => {
    void useDen.persist.rehydrate();
    useDen.setState({ hydrated: true });
  }, []);

  useEffect(() => {
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
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", colors.base);
  }, [colors, layout.rounded, layout.borderRadius, scheme]);

  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        theme={scheme}
        toastOptions={{
          className: "!bg-canvas !text-fg !border-surface !rounded-surface",
        }}
      />
    </>
  );
}
