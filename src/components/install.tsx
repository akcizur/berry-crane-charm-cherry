import { useDen } from "@/lib/store";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    n: "01",
    title: "Allow user styles",
    body: "In the address bar open about:config. Search for toolkit.legacyUserProfileCustomizations.stylesheets and set it to true.",
  },
  {
    n: "02",
    title: "Open your profile",
    body: "Help → More troubleshooting information → Profile Folder → Open Folder. Create a folder named chrome if it is not already there.",
  },
  {
    n: "03",
    title: "Drop the sheets",
    body: "Download both files from Studio and place userChrome.css and userContent.css inside that chrome folder, replacing older copies.",
  },
  {
    n: "04",
    title: "Restart Firefox",
    body: "Fully quit and reopen. The one-line chrome and Gruvbox surfaces should land immediately. Private windows follow the same files.",
  },
];

export function Install() {
  const setView = useDen((s) => s.setView);

  return (
    <div className="den-enter mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
      <p className="mb-2 text-xs tracking-[0.18em] text-muted uppercase">FoxOne 3.8.1</p>
      <h1 className="text-display font-medium tracking-tight text-fg">Install</h1>
      <p className="mt-3 text-pretty text-muted">
        Den exports a patched FoxOne theme — the same one-line layout, with your Studio
        palette. Firefox does not load chrome CSS until the preference below is on.
      </p>

      <ol className="mt-10 flex flex-col gap-8">
        {STEPS.map((s) => (
          <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-4">
            <span className="font-mono text-sm text-accent tabular-nums">{s.n}</span>
            <div>
              <h2 className="text-base font-medium text-fg">{s.title}</h2>
              <p className="mt-1 text-pretty text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => setView("studio")}>
          Open Studio
        </Button>
        <Button variant="outline" onClick={() => setView("habitat")}>
          Back to Habitat
        </Button>
      </div>

      <p className="mt-12 text-sm text-muted">
        FoxOne is based on Cascade and LittleFox, MIT licensed. Den only recolours and
        packages it — keep the original comments in the sheet if you upstream a change.
      </p>
    </div>
  );
}
