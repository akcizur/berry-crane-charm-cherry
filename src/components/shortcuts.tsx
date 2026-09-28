import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDen } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function mark(name: string) {
  const ch = name.replace(/[^a-zA-Z0-9]/g, "").charAt(0);
  return (ch || "?").toUpperCase();
}

function normalizeUrl(raw: string) {
  const t = raw.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

export function Shortcuts() {
  const shortcuts = useDen((s) => s.shortcuts);
  const addShortcut = useDen((s) => s.addShortcut);
  const updateShortcut = useDen((s) => s.updateShortcut);
  const removeShortcut = useDen((s) => s.removeShortcut);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function startAdd() {
    setEditId(null);
    setName("");
    setUrl("");
    setOpen(true);
  }

  function startEdit(id: string, n: string, u: string) {
    setEditId(id);
    setName(n);
    setUrl(u);
    setOpen(true);
  }

  function save() {
    const n = name.trim();
    const u = normalizeUrl(url);
    if (!n || !u) {
      toast("Name and address are required");
      return;
    }
    if (editId) updateShortcut(editId, { name: n, url: u });
    else addShortcut(n, u);
    setOpen(false);
  }

  return (
    <section className="den-enter den-enter-2 mx-auto mt-8 w-full max-w-3xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs tracking-[0.16em] text-muted uppercase">Places</h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing((v) => !v)}
            aria-pressed={editing}
          >
            <Pencil className="size-3.5" />
            {editing ? "Done" : "Edit"}
          </Button>
          <Button variant="ghost" size="sm" onClick={startAdd}>
            <Plus className="size-3.5" />
            Add
          </Button>
        </div>
      </div>
      <ul className="flex flex-wrap justify-center gap-2">
        {shortcuts.map((s) => (
          <li key={s.id} className="relative">
            {editing ? (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => startEdit(s.id, s.name, s.url)}
                  className="flex h-11 items-center gap-2 rounded-row px-3 text-sm text-fg hover:text-accent"
                >
                  <span className="inline-flex size-6 items-center justify-center border border-surface font-mono text-xs">
                    {mark(s.name)}
                  </span>
                  {s.name}
                </button>
                <button
                  type="button"
                  onClick={() => removeShortcut(s.id)}
                  className="inline-flex size-11 items-center justify-center text-muted hover:text-danger"
                  aria-label={`Remove ${s.name}`}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ) : (
              <a
                href={s.url}
                className="flex h-11 items-center gap-2 rounded-row px-3 text-sm text-fg hover:text-accent"
              >
                <span className="inline-flex size-6 items-center justify-center border border-surface font-mono text-xs">
                  {mark(s.name)}
                </span>
                {s.name}
              </a>
            )}
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title={editId ? "Edit place" : "New place"}>
          <div className="flex flex-col gap-3">
            <label className="text-xs tracking-[0.14em] text-muted uppercase">
              Name
              <Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="text-xs tracking-[0.14em] text-muted uppercase">
              Address
              <Input
                className="mt-1.5"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://"
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                }}
              />
            </label>
            <Button variant="primary" onClick={save} className="mt-1">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
