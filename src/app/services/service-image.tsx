"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServiceImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ServiceImage({ src, alt, className, priority = false }: ServiceImageProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={cn("p-3 group", className)}>
      <div
        className={cn(
          "relative w-full aspect-[16/9] bg-plate transition-all duration-[400ms] ease-[cubic-bezier(.2,.7,.25,1)] group-hover:-translate-y-[3px]"
        )}
        style={{
          borderRadius: "10px",
          boxShadow: hovered ? "var(--bevel-strong), var(--lift-2)" : "var(--bevel), var(--lift-1)",
          overflow: "hidden"
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover img-machined"
          priority={priority}
          loading={priority ? undefined : "eager"}
        />
      </div>
    </div>
  );
}
