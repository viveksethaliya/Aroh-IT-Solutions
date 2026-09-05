"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** 
 * Mounts in layout. Adds .js-reveal to <html> so .obs elements start hidden,
 * then runs IntersectionObserver to add .in when they enter the viewport.
 * Runs on mount and on every route change to catch newly rendered .obs elements.
 */
export function RevealInit() {
  const pathname = usePathname();
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js-reveal");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(".obs").forEach((el) => {
        el.classList.add("in");
      });
      return;
    }

    if (!ioRef.current) {
      ioRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              ioRef.current?.unobserve(en.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
    }

    // Small delay ensures DOM has updated after route change
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".obs").forEach((el) => {
        if (!el.classList.contains("in")) {
          ioRef.current?.observe(el);
        }
      });
    }, 100);

    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    return () => ioRef.current?.disconnect();
  }, []);

  return null;
}
