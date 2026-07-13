"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Home, Info, Briefcase, Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(pathname !== "/");
  const [hasHovered, setHasHovered] = useState(false);

  const checkVisibility = (currentScrollY: number) => {
    // Check if we are at the bottom of the page (within 50px)
    const isAtBottom = 
      window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 50;

    if (isAtBottom) {
      setIsVisible(false);
      return;
    }

    if (pathname === "/") {
      setIsVisible(currentScrollY > 100);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    checkVisibility(window.scrollY);
    
    // Check on resize as document height or window height might change
    const handleResize = () => checkVisibility(window.scrollY);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    checkVisibility(latest);
  });

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 z-50 w-max"
          onMouseEnter={() => setHasHovered(true)}
        >
          <div className="flex h-14 items-center gap-2 rounded-full bg-background/95 border border-border/50 shadow-2xl backdrop-blur-xl px-3 py-2">
            
            {/* Standard Navigation Links */}
            <div className="flex items-center gap-1 md:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center p-2.5 transition-all relative group rounded-full aspect-square",
                      isActive 
                        ? "bg-foreground text-background shadow-md" // Active state: tight black round
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                    aria-label={link.name}
                  >
                    <link.icon className="h-5 w-5" />
                    
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full mb-3 scale-0 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg transition-all group-hover:scale-100 whitespace-nowrap">
                      {link.name}
                      {/* Triangle for tooltip */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pl-2">
              {/* Separator */}
              <div className="w-[1px] h-6 bg-border"></div>

              {/* Special Get a Quote Button */}
              <Link
                href="/contact"
                className="flex items-center justify-center p-2.5 text-primary transition-all relative group rounded-full hover:bg-primary/10 aspect-square"
                aria-label="Get a Quote"
              >
                {/* Shining/Ping Effect */}
                <div className={cn("absolute inset-1 rounded-full bg-primary/30", hasHovered ? "hidden" : "animate-ping")}></div>
                
                <MessageSquare className="h-5 w-5 relative z-10" />
                
                {/* Permanent Pop Message (Hides permanently on navbar hover) */}
                <div className={cn(
                  "absolute bottom-full mb-2 transition-transform origin-bottom duration-300 pointer-events-none z-20",
                  hasHovered ? "scale-0" : "scale-100"
                )}>
                  <div className="relative animate-bounce bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-xl whitespace-nowrap">
                    Get a Quote
                    {/* Longer, slightly rounder connected tail pointing down */}
                    <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rotate-45 rounded-br-[6px] -z-10" />
                  </div>
                </div>

                {/* Standard Tooltip that appears on hover */}
                <span className="absolute bottom-full mb-3 scale-0 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg transition-all group-hover:scale-100 whitespace-nowrap z-20">
                  Contact Us
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                </span>
              </Link>
            </div>
            
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
