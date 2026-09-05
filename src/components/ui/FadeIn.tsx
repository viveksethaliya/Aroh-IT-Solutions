"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  // Kept for prop compatibility but unused natively
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  viewportMargin?: string;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  className = ""
}: FadeInProps) {
  return (
    <div
      className={cn("obs", className)}
      style={{ transitionDelay: delay > 0 ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}
