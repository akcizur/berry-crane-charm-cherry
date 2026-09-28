import { createFileRoute } from "@tanstack/react-router";
import { ChromeBar } from "@/components/chrome-bar";
import { Clock } from "@/components/clock";
import { CommandSearch } from "@/components/command-search";
import { Install } from "@/components/install";
import { Shortcuts } from "@/components/shortcuts";
import { Studio } from "@/components/studio";
import { Widgets } from "@/components/widgets";
import { useDen } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Habitat() {
  return (
    <main className="flex flex-col items-center px-4 pt-6 pb-8 sm:pt-8">
      <Clock />
      <CommandSearch />
      <Shortcuts />
      <Widgets />
    </main>
  );
}

function Home() {
  const view = useDen((s) => s.view);

  return (
    <div className="relative min-h-dvh bg-canvas text-fg">
      <div className="den-grain" aria-hidden />
      <ChromeBar />
      {view === "habitat" ? <Habitat /> : null}
      {view === "studio" ? <Studio /> : null}
      {view === "install" ? <Install /> : null}
      <footer className="flex items-center justify-between gap-4 border-t border-surface px-4 py-3 text-xs text-faint">
        <span>Den</span>
        <span className="font-mono">FoxOne habitat</span>
      </footer>
    </div>
  );
}
