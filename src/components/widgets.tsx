import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Play, Square, Trash2 } from "lucide-react";
import { useDen } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";

function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex min-h-40 flex-col rounded-surface border border-surface bg-canvas p-4",
        className,
      )}
    >
      <h2 className="mb-4 text-xs tracking-[0.16em] text-muted uppercase">{title}</h2>
      {children}
    </section>
  );
}

export function Today() {
  const tasks = useDen((s) => s.tasks);
  const addTask = useDen((s) => s.addTask);
  const toggleTask = useDen((s) => s.toggleTask);
  const removeTask = useDen((s) => s.removeTask);
  const [draft, setDraft] = useState("");
  const remaining = tasks.filter((t) => !t.done).length;

  function submit() {
    const t = draft.trim();
    if (!t) return;
    addTask(t);
    setDraft("");
  }

  return (
    <Panel title={`Today${tasks.length ? ` · ${remaining}` : ""}`}>
      <form
        className="mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a task"
          aria-label="New task"
        />
      </form>
      {tasks.length === 0 ? (
        <p className="text-sm text-muted">Nothing queued. Type above and press Enter.</p>
      ) : (
        <ul className="flex flex-col gap-1 overflow-y-auto">
          {tasks.map((t) => (
            <li key={t.id} className="group flex items-center gap-1">
              <button
                type="button"
                onClick={() => toggleTask(t.id)}
                className={cn(
                  "flex min-h-11 flex-1 items-center gap-3 px-1 text-left text-sm",
                  t.done ? "text-muted line-through" : "text-fg hover:text-accent",
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-4 shrink-0 items-center justify-center border",
                    t.done ? "border-accent bg-accent text-canvas" : "border-hover",
                  )}
                  aria-hidden
                >
                  {t.done ? <Check className="size-3" /> : null}
                </span>
                {t.text}
              </button>
              <button
                type="button"
                onClick={() => removeTask(t.id)}
                className="inline-flex size-11 items-center justify-center text-faint hover:text-danger"
                aria-label={`Remove ${t.text}`}
              >
                <Trash2 className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

export function Scratch() {
  const note = useDen((s) => s.note);
  const setNote = useDen((s) => s.setNote);
  return (
    <Panel title="Scratch">
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="A line, a thought, a link."
        className="min-h-24 flex-1"
        aria-label="Scratch pad"
      />
    </Panel>
  );
}

const WORK_SEC = 25 * 60;
const BREAK_SEC = 5 * 60;

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 784;
    osc.type = "sine";
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
    window.setTimeout(() => void ctx.close(), 400);
  } catch {
    /* ignore */
  }
}

function fmt(sec: number) {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export function FocusTimer() {
  const [phase, setPhase] = useState<"idle" | "work" | "break">("idle");
  const [remaining, setRemaining] = useState(WORK_SEC);
  const endsAt = useRef<number | null>(null);

  useEffect(() => {
    if (!endsAt.current) return;
    const id = window.setInterval(() => {
      if (!endsAt.current) return;
      const left = (endsAt.current - Date.now()) / 1000;
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
      } else {
        setRemaining(left);
      }
    }, 200);
    return () => window.clearInterval(id);
  }, [phase]);

  function start() {
    const dur = phase === "break" ? remaining || BREAK_SEC : remaining || WORK_SEC;
    const next = phase === "idle" ? "work" : phase;
    endsAt.current = Date.now() + dur * 1000;
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
  const label = phase === "break" ? "Break" : phase === "work" ? "Focus" : "Ready";

  return (
    <Panel title="Focus">
      <p className="mb-1 text-xs tracking-[0.14em] text-muted uppercase">{label}</p>
      <p className="font-mono text-4xl tracking-tight text-fg tabular-nums">{fmt(remaining)}</p>
      <div className="mt-auto flex gap-2 pt-6">
        {running ? (
          <Button variant="outline" onClick={pause}>
            <Square className="size-3.5" />
            Pause
          </Button>
        ) : (
          <Button variant="primary" onClick={start}>
            <Play className="size-3.5" />
            {phase === "idle" ? "Start" : "Resume"}
          </Button>
        )}
        <Button variant="ghost" onClick={reset}>
          Reset
        </Button>
      </div>
    </Panel>
  );
}

export function Widgets() {
  return (
    <div className="den-enter den-enter-3 mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
      <Today />
      <Scratch />
      <FocusTimer />
    </div>
  );
}
