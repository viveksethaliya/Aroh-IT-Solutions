import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full min-h-[132px]",
        "rounded-[4px]",
        "border-0 bg-input",
        "px-3 py-2",
        "text-base text-foreground md:text-sm",
        "placeholder:text-muted-foreground",
        "transition-[box-shadow] duration-[250ms]",
        "outline-none",
        "resize-vertical",
        // recessed well at rest
        "[box-shadow:var(--recess)]",
        // focus: recess + 2px ring outside
        "focus:[box-shadow:var(--recess),0_0_0_2px_var(--ring)]",
        // error state: recess + 2px var(--foreground) outline
        "aria-invalid:[box-shadow:var(--recess),0_0_0_2px_var(--foreground)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
