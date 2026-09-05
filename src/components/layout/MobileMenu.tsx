import { useEffect, useRef } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const links = [
  { href: "/services", label: "Capabilities" },
  { href: "/#process", label: "How we work" },
  { href: "/portfolio", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Trap focus and lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      const first = focusable?.[0];
      const last = focusable?.[focusable.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
        }
      };
      
      document.addEventListener("keydown", handleKeyDown);
      panelRef.current?.focus();

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      tabIndex={-1}
      className={cn(
        "fixed top-[74px] right-0 bottom-0 left-0 z-40 bg-background flex flex-col justify-between overflow-y-auto outline-none",
        "transition-transform duration-[280ms] ease-[cubic-bezier(.2,.7,.25,1)] motion-reduce:transition-none",
        isOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
      )}
    >
      <div className="flex flex-col w-full px-[clamp(20px,4vw,60px)] pt-4">
        <nav className="flex flex-col">
          {links.map((link) => {
            const isActive = pathname === link.href || (pathname === "/" && link.href === "/#process");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "py-6 text-left [&:not(:last-child)]:border-b border-border type-h3 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                style={{ fontVariationSettings: '"wdth" 88,"wght" 620' }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="pt-8 pb-4">
          <Link
            href="/contact"
            onClick={onClose}
            className={cn(buttonVariants({ variant: "solid", size: "lg" }), "w-full text-center outline-none focus-visible:ring-2 focus-visible:ring-foreground")}
          >
            Start a project
          </Link>
        </div>
      </div>
      
      <div className="px-[clamp(20px,4vw,60px)] pb-12 pt-4">
        <p className="text-[.8125rem] text-muted-foreground m-0">
          Product engineering studio, Ahmedabad and Vancouver
        </p>
      </div>
    </div>
  );
}
