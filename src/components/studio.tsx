import { useState } from "react";
import { toast } from "sonner";
import { PRESETS, type Palette } from "@/lib/palettes";
import {
  downloadPatchedCss,
  downloadText,
  paletteSnippet,
  type FoxOneLayout,
} from "@/lib/foxone";
import { SEARCH_ENGINES, type SearchEngineId } from "@/lib/search";
import { useDen } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const COLOR_FIELDS: { key: keyof Palette; label: string }[] = [
  { key: "base", label: "Base" },
  { key: "surface", label: "Surface" },
  { key: "accent", label: "Accent" },
  { key: "text", label: "Text" },
  { key: "hover", label: "Hover" },
  { key: "tabHover", label: "Tab hover" },
];

function HexField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid grid-cols-[1fr_auto_6.5rem] items-center gap-2">
      <span className="text-sm text-fg">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="size-9 cursor-pointer rounded-row border border-surface bg-canvas p-0"
        aria-label={`${label} colour`}
      />
      <Input
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
        }}
        onBlur={() => {
          if (!/^#[0-9A-Fa-f]{6}$/.test(value)) onChange("#282828");
        }}
        className="h-9 font-mono text-xs"
        spellCheck={false}
      />
    </label>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm text-fg">{label}</p>
        {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function Studio() {
  const presetId = useDen((s) => s.presetId);
  const palette = useDen((s) => s.palette);
  const layout = useDen((s) => s.layout);
  const searchEngine = useDen((s) => s.searchEngine);
  const setPreset = useDen((s) => s.setPreset);
  const setColor = useDen((s) => s.setColor);
  const setLayout = useDen((s) => s.setLayout);
  const setSearchEngine = useDen((s) => s.setSearchEngine);
  const resetAll = useDen((s) => s.resetAll);
  const [busy, setBusy] = useState<"chrome" | "content" | null>(null);

  async function download(kind: "chrome" | "content") {
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
    void navigator.clipboard.writeText(text).then(
      () => toast("Palette snippet copied"),
      () => {
        downloadText("foxone-palette.css", text, "text/css");
        toast("Clipboard blocked — downloaded instead");
      },
    );
  }

  return (
    <div className="den-enter mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-10 max-w-2xl">
        <p className="mb-2 text-xs tracking-[0.18em] text-muted uppercase">FoxOne 3.8.1</p>
        <h1 className="text-display font-medium tracking-tight text-fg">Studio</h1>
        <p className="mt-3 text-pretty text-muted">
          Recolour the habitat and export a patched FoxOne sheet. Accent is a text colour —
          hover a tab in the bar above to see the cue.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-4 text-xs tracking-[0.16em] text-muted uppercase">Presets</h2>
            <div className="flex flex-wrap gap-1">
              {PRESETS.map((p) => (
                <Button
                  key={p.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreset(p.id, p.pair)}
                  className={cn(presetId === p.id && "text-accent")}
                >
                  {p.name}
                </Button>
              ))}
              {presetId === "custom" ? (
                <span className="inline-flex h-9 items-center px-3 text-sm text-accent">Custom</span>
              ) : null}
            </div>
          </section>

          <section className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xs tracking-[0.16em] text-muted uppercase">Dark</h2>
              <div className="flex flex-col gap-3">
                {COLOR_FIELDS.map((f) => (
                  <HexField
                    key={f.key}
                    label={f.label}
                    value={palette.dark[f.key]}
                    onChange={(v) => {
                      if (/^#[0-9A-Fa-f]{6}$/.test(v)) setColor("dark", f.key, v);
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xs tracking-[0.16em] text-muted uppercase">Light</h2>
              <div className="flex flex-col gap-3">
                {COLOR_FIELDS.map((f) => (
                  <HexField
                    key={`l-${f.key}`}
                    label={f.label}
                    value={palette.light[f.key]}
                    onChange={(v) => {
                      if (/^#[0-9A-Fa-f]{6}$/.test(v)) setColor("light", f.key, v);
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs tracking-[0.16em] text-muted uppercase">Shape</h2>
            <ToggleRow
              label="Rounded corners"
              hint="FoxOne default is square. On uses the radius below."
              checked={layout.rounded === 1}
              onChange={(v) => setLayout("rounded", v ? 1 : 0)}
            />
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Radius</span>
                <span className="font-mono text-muted tabular-nums">{layout.borderRadius}px</span>
              </div>
              <Slider
                min={4}
                max={16}
                step={1}
                value={[layout.borderRadius]}
                onValueChange={([v]) => setLayout("borderRadius", v ?? 8)}
              />
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Tab min width</span>
                <span className="font-mono text-muted tabular-nums">{layout.tabMinWidth}px</span>
              </div>
              <Slider
                min={36}
                max={120}
                step={2}
                value={[layout.tabMinWidth]}
                onValueChange={([v]) => setLayout("tabMinWidth", v ?? 76)}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xs tracking-[0.16em] text-muted uppercase">Chrome</h2>
            <ToggleRow
              label="Hide URL-bar icons"
              hint="Shield, reader, star — no misclicks."
              checked={layout.hideUrlbarButtons === 1}
              onChange={(v) => setLayout("hideUrlbarButtons", v ? 1 : 0)}
            />
            <ToggleRow
              label="Hide extension icons"
              hint="Reveal on hamburger hover."
              checked={layout.hideExtensionIcons === 1}
              onChange={(v) => setLayout("hideExtensionIcons", v ? 1 : 0)}
            />
            <ToggleRow
              label="Puzzle button on the right"
              checked={layout.extensionsButtonRight === 1}
              onChange={(v) => setLayout("extensionsButtonRight", v ? 1 : 0)}
            />
            <ToggleRow
              label="Dynamic bookmarks bar"
              hint="Overlays on URL-bar hover."
              checked={layout.dynamicBookmarks === 1}
              onChange={(v) => setLayout("dynamicBookmarks", v ? 1 : 0)}
            />
            <ToggleRow
              label="Bookmarks on fresh tabs"
              checked={layout.dynamicBookmarksNewtab === 1}
              onChange={(v) => setLayout("dynamicBookmarksNewtab", v ? 1 : 0)}
            />
            <ToggleRow
              label="Hide back / forward / reload"
              checked={layout.hideNavButtons === 1}
              onChange={(v) => setLayout("hideNavButtons", v ? 1 : 0)}
            />
            <ToggleRow
              label="Show all-tabs button"
              checked={layout.showAllTabsButton === 1}
              onChange={(v) => setLayout("showAllTabsButton", v ? 1 : 0)}
            />
            <ToggleRow
              label="Tab loading bar"
              checked={layout.showLoadingProgress === 1}
              onChange={(v) => setLayout("showLoadingProgress", v ? 1 : 0)}
            />
            <ToggleRow
              label="Container line on top"
              checked={layout.containerLineTop === 1}
              onChange={(v) => setLayout("containerLineTop", v ? 1 : 0)}
            />
            <div className="flex items-center justify-between gap-4 py-2">
              <div>
                <p className="text-sm text-fg">Auto-hide nav buttons</p>
                <p className="text-xs text-muted">0 always · 1 hover+focus · 2 hover</p>
              </div>
              <select
                className="h-11 rounded-row border border-surface bg-canvas px-3 text-sm text-fg"
                value={layout.autohideNavButtons}
                onChange={(e) =>
                  setLayout("autohideNavButtons", Number(e.target.value) as FoxOneLayout["autohideNavButtons"])
                }
              >
                <option value={0}>Off</option>
                <option value={1}>Hover and focus</option>
                <option value={2}>Hover</option>
              </select>
            </div>
          </section>
        </div>

        <aside className="flex h-fit flex-col gap-6 rounded-surface border border-surface p-5 lg:sticky lg:top-6">
          <div>
            <h2 className="mb-3 text-xs tracking-[0.16em] text-muted uppercase">Export</h2>
            <p className="mb-4 text-sm text-pretty text-muted">
              Patches FoxOne 3.8.1 with this palette. Drop the files into your profile chrome folder.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="primary" onClick={() => void download("chrome")} disabled={busy !== null}>
                {busy === "chrome" ? "Preparing…" : "Download userChrome.css"}
              </Button>
              <Button variant="outline" onClick={() => void download("content")} disabled={busy !== null}>
                {busy === "content" ? "Preparing…" : "Download userContent.css"}
              </Button>
              <Button variant="ghost" onClick={copySnippet}>
                Copy palette snippet
              </Button>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xs tracking-[0.16em] text-muted uppercase">Search engine</h2>
            <select
              className="h-11 w-full rounded-row border border-surface bg-canvas px-3 text-sm text-fg"
              value={searchEngine}
              onChange={(e) => setSearchEngine(e.target.value as SearchEngineId)}
            >
              {(Object.keys(SEARCH_ENGINES) as SearchEngineId[]).map((id) => (
                <option key={id} value={id}>
                  {SEARCH_ENGINES[id].name}
                </option>
              ))}
            </select>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              resetAll();
              toast("Restored FoxOne Gruvbox");
            }}
          >
            Reset Den
          </Button>
        </aside>
      </div>
    </div>
  );
}
