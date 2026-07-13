"use client";

import { useState } from "react";

interface ServiceImageProps {
  src: string;
  alt: string;
}

export function ServiceImage({ src, alt }: ServiceImageProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="order-1 lg:order-2 p-3">
      <div
        className="relative w-full aspect-[16/9] rounded-2xl transition-all duration-500"
        style={{
          background: "var(--color-muted, #e9ecef)",
          boxShadow: hovered
            ? "12px 12px 40px rgba(0,0,0,0.18), -12px -12px 40px rgba(255,255,255,0.95)"
            : "4px 4px 10px rgba(0,0,0,0.08), -4px -4px 10px rgba(255,255,255,0.9)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full rounded-2xl"
          loading="lazy"
        />
      </div>
    </div>
  );
}
