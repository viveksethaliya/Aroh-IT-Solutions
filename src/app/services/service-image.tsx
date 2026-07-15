"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ServiceImage({ src, alt, className }: ServiceImageProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={cn("p-3", className)}>
      <div
        className={cn(
          "relative w-full aspect-[16/9] rounded-lg transition-all duration-500 cursor-default",
          "shadow-modern bg-card"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full rounded-lg"
          loading="lazy"
        />
      </div>
    </div>
  );
}
