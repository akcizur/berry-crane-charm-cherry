import type { ComponentProps } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-row border border-surface bg-canvas",
        "transition-[background-color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
        "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block size-4 rounded-row bg-fg transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]",
          "translate-x-1 data-[state=checked]:translate-x-5 data-[state=checked]:bg-canvas",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
