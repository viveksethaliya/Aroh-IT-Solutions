"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceImageProps {
  src: string;
  alt: string;
}

export function ServiceImage({ src, alt }: ServiceImageProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="order-1 lg:order-2 p-3">
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
