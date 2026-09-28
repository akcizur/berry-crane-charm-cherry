import { useEffect, useState } from "react";
import { useDen } from "@/lib/store";

function parts(now: Date, clock24: boolean) {
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !clock24,
  }).format(now);
  const date = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
  const dateShort = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(now);
  return { time, date, dateShort };
}

export function Clock() {
  const clock24 = useDen((s) => s.clock24);
  const setClock24 = useDen((s) => s.setClock24);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { time, date, dateShort } = parts(now, clock24);

  return (
    <div className="den-enter w-full text-center">
      <p className="mb-2 text-sm tracking-[0.18em] text-muted uppercase">
        <span className="hidden whitespace-nowrap sm:inline">{date}</span>
        <span className="whitespace-nowrap sm:hidden">{dateShort}</span>
      </p>
      <button
        type="button"
        onClick={() => setClock24(!clock24)}
        className="font-mono text-clock leading-none font-normal tracking-[-0.04em] text-fg whitespace-nowrap tabular-nums"
        aria-label="Toggle 12 or 24 hour clock"
        title="Toggle 12 / 24 hour"
      >
        {time}
      </button>
    </div>
  );
}
