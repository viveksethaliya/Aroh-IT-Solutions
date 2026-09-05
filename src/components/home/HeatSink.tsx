"use client";

import { useEffect, useRef } from "react";

/**
 * HeatSink — the page's one bold object.
 * Machined aluminium fin array, raked by a single light source.
 * Decorative only: aria-hidden, hidden below 1080px.
 * Fins are fixed at 26 — no window-width branch, no hydration mismatch.
 */
export function HeatSink() {
  const sinkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sink = sinkRef.current;
    if (!sink) return;
    // Trigger animation class after mount
    requestAnimationFrame(() => {
      sink.classList.add("go");
    });
  }, []);

  return (
    <div
      ref={sinkRef}
      className="sink"
      aria-hidden="true"
    >
      {Array.from({ length: 26 }, (_, i) => (
        <span key={i} className="fin" />
      ))}
    </div>
  );
}
