import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-row border border-surface bg-canvas px-3 text-sm text-fg",
        "placeholder:text-faint transition-[border-color,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
        "hover:border-hover focus:border-accent focus:bg-surface focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full resize-none rounded-row border border-surface bg-canvas px-3 py-2 text-sm text-fg",
        "placeholder:text-faint transition-[border-color,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
        "hover:border-hover focus:border-accent focus:bg-surface focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
