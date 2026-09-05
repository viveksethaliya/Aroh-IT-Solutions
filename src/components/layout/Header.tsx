"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header 
      id="hdr"
      className={cn(
        "hdr fixed top-0 left-0 right-0 z-50 h-[74px] transition-[background,box-shadow,transform] duration-[400ms] ease-[cubic-bezier(.2,.7,.25,1)]",
        isScrolled ? "stuck" : ""
      )}
    >
      <div className="mx-auto w-full max-w-[1340px] px-[clamp(20px,4vw,60px)] h-full flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-[.55rem] text-foreground hover:opacity-80 transition-opacity">
          <b className="text-[1.35rem] tracking-[-.01em]" style={{ fontVariationSettings: '"wdth" 78,"wght" 700' }}>Aroh</b>
          <span className="text-[.75rem] text-muted-foreground hidden sm:inline-block" style={{ fontVariationSettings: '"wdth" 100,"wght" 400' }}>IT Solutions</span>
        </Link>
        
        {/* Nav — hidden below 880px */}
        <nav className="flex items-center gap-[clamp(16px,2vw,32px)]" style={{ display: undefined }} aria-label="Main navigation">
          <Link href="/services" className="text-[0.875rem] font-medium text-muted-foreground hover:text-foreground transition-colors max-[880px]:hidden">Capabilities</Link>
          <Link href="/#process" className="text-[0.875rem] font-medium text-muted-foreground hover:text-foreground transition-colors max-[880px]:hidden">How we work</Link>
          <Link href="/portfolio" className="text-[0.875rem] font-medium text-muted-foreground hover:text-foreground transition-colors max-[880px]:hidden">Work</Link>
          <Link href="/contact" className="text-[0.875rem] font-medium text-muted-foreground hover:text-foreground transition-colors max-[880px]:hidden">Contact</Link>

          {/* CTA: scroll-gated on desktop, always visible on mobile (≤880px) */}
          <Link 
            href="/contact" 
            className={cn(
              buttonVariants({ variant: "plate", size: "sm" }),
              "transition-all duration-300 transform",
              // desktop: only show when scrolled
              "max-[880px]:opacity-100 max-[880px]:translate-y-0 max-[880px]:pointer-events-auto",
              isScrolled 
                ? "opacity-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 -translate-y-[10px] pointer-events-none max-[880px]:opacity-100 max-[880px]:translate-y-0 max-[880px]:pointer-events-auto"
            )}
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
