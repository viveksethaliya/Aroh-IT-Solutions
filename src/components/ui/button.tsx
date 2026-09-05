import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center",
    "h-[52px] px-6 rounded-[4px]",
    "text-[0.98rem] font-[560]",
    "tracking-[0.002em]",
    "border-0 cursor-pointer select-none whitespace-nowrap",
    "transition-[transform,box-shadow,background] duration-[180ms,250ms,250ms]",
    "outline-none",
    "focus-visible:outline-[2px] focus-visible:outline-foreground focus-visible:outline-offset-[3px]",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /**
         * solid — bright plate. One per viewport maximum.
         * #FAFAFA → #E5E5E5 gradient, black label.
         */
        solid: [
          "text-[var(--primary-foreground)]",
          "[background:linear-gradient(180deg,var(--foreground),var(--n-800))]",
          "[box-shadow:0_1px_0_rgba(255,255,255,.5)_inset,var(--lift-1)]",
          "hover:-translate-y-px hover:[box-shadow:0_1px_0_rgba(255,255,255,.6)_inset,var(--lift-2)]",
          "active:translate-y-px active:[box-shadow:var(--recess)] active:[background:var(--n-800)]",
        ].join(" "),

        /**
         * plate — raised dark panel. Everything else.
         * #262626 → #171717 gradient, foreground label.
         */
        plate: [
          "text-foreground",
          "[background:linear-gradient(180deg,var(--high),var(--raised))]",
          "[box-shadow:var(--bevel),var(--undercut),var(--lift-1)]",
          "hover:-translate-y-px hover:[background:linear-gradient(180deg,var(--tertiary),var(--high))] hover:[box-shadow:var(--bevel-strong),var(--lift-2)]",
          "active:translate-y-px active:[box-shadow:var(--recess)]",
        ].join(" "),
      },
      size: {
        default: "h-[52px] px-6",
        sm:      "h-[44px] px-[1.15rem] text-[0.9rem]",
        lg:      "h-[52px] px-8 text-base",
        icon:    "size-[52px] px-0",
        "icon-sm": "size-[44px] px-0",
      },
    },
    defaultVariants: {
      variant: "plate",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "plate",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
