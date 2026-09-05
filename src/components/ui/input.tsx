import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0",
        "rounded-[4px]",
        "border-0 bg-input",
        "px-3 py-2",
        "text-base text-foreground md:text-sm",
        "placeholder:text-muted-foreground",
        "transition-[box-shadow] duration-[250ms]",
        "outline-none",
        // recessed well at rest
        "[box-shadow:var(--recess)]",
        // focus: recess + 2px ring outside, never raised
        "focus:[box-shadow:var(--recess),0_0_0_2px_var(--ring)]",
        // error state: recess + 2px var(--foreground) outline
        "aria-invalid:[box-shadow:var(--recess),0_0_0_2px_var(--foreground)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
