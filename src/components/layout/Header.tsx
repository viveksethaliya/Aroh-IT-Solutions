"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/services", label: "Capabilities" },
  { href: "/#process", label: "How we work" },
  { href: "/portfolio", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Return focus to trigger when closing menu
  useEffect(() => {
    if (!isMobileMenuOpen && document.activeElement !== triggerRef.current) {
      triggerRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        id="hdr"
        className={cn(
          "hdr fixed top-0 left-0 right-0 z-50 h-[74px] transition-[background,box-shadow,transform] duration-[400ms] ease-[cubic-bezier(.2,.7,.25,1)]",
          isScrolled || isMobileMenuOpen ? "stuck" : "",
          isMobileMenuOpen ? "bg-background" : ""
        )}
      >
        <div className="mx-auto w-full max-w-[1340px] px-[clamp(20px,4vw,60px)] h-full flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-[.55rem] text-foreground hover:opacity-80 transition-opacity">
            <b className="text-[1.35rem] tracking-[-.01em]" style={{ fontVariationSettings: '"wdth" 78,"wght" 700' }}>Aroh</b>
            <span className="text-[.75rem] text-muted-foreground hidden sm:inline-block" style={{ fontVariationSettings: '"wdth" 100,"wght" 400' }}>IT Solutions</span>
          </Link>
          
          <div className="flex items-center">
            {/* Desktop Nav */}
            <nav className="flex items-center gap-[clamp(16px,2vw,32px)] max-[880px]:hidden" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname === "/" && link.href === "/#process");
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={cn(
                      "py-3 text-[0.875rem] font-medium transition-colors duration-200",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div 
                className={cn(
                  "w-[1px] h-[24px] bg-border mx-[20px] transition-all duration-300",
                  isScrolled ? "opacity-100 visible" : "opacity-0 invisible"
                )} 
                aria-hidden="true" 
              />
            </nav>

            <div className="flex items-center gap-3">
              {/* Mobile Menu Trigger */}
              <button
                ref={triggerRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hidden max-[880px]:flex h-[44px] w-[44px] items-center justify-center rounded-md text-foreground hover:bg-muted transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu-panel"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* CTA: scroll-gated on desktop, hidden on mobile */}
              <Link 
                href="/contact" 
                className={cn(
                  buttonVariants({ variant: "plate", size: "sm" }),
                  "transition-all duration-300 transform",
                  // desktop: only show when scrolled
                  "max-[880px]:hidden",
                  isScrolled 
                    ? "opacity-100 translate-y-0 visible" 
                    : "opacity-0 -translate-y-[10px] invisible"
                )}
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        pathname={pathname}
      />
    </>
  );
}
