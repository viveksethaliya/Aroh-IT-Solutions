"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HeatSink } from "./HeatSink";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isGo, setIsGo] = useState(false);
  const [isLit, setIsLit] = useState(false);

  useEffect(() => {
    // one orchestrated load moment
    requestAnimationFrame(() => setIsGo(true));
  }, []);

  const handlePointerEnter = () => setIsLit(true);
  const handlePointerLeave = () => setIsLit(false);
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    heroRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className={`relative flex items-end overflow-hidden pt-[clamp(104px,13vh,132px)] max-[720px]:pt-[84px] pb-[clamp(34px,6vh,68px)] min-h-[100svh] ${isGo ? 'hero-go' : ''} ${isLit ? 'lit' : ''}`}
      style={{
        background: "radial-gradient(120% 90% at 12% -10%, var(--high) 0%, var(--plate) 44%, var(--background) 100%)",
      }}
    >
      {/* brushed-metal grain */}
      <div 
        className="absolute inset-[-10%] pointer-events-none opacity-55"
        style={{
          background: "repeating-linear-gradient(96deg, rgba(255,255,255,.028) 0 1px, transparent 1px 3px), repeating-linear-gradient(96deg, rgba(0,0,0,.35) 0 1px, transparent 1px 7px)",
          maskImage: "radial-gradient(80% 70% at 30% 40%, var(--background) 20%, transparent 78%)"
        }}
        aria-hidden="true"
      />

      {/* specular light */}
      <div 
        className={`spec absolute w-[1100px] h-[1100px] left-0 top-0 -ml-[550px] pointer-events-none mix-blend-plus-lighter transition-opacity duration-600 ease-[cubic-bezier(.2,.7,.25,1)] ${isLit ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: "radial-gradient(circle closest-side, rgba(255,255,255,.16), rgba(255,255,255,.05) 42%, transparent 72%)",
          transform: "translate3d(var(--mx,50vw),var(--my,40vh),0)",
          marginTop: "-550px"
        }}
        aria-hidden="true"
      />
      
      <div className="sweep" aria-hidden="true" />
      <HeatSink />

      <div className="wrap relative w-full z-[2]">
        <div className="flex flex-wrap gap-x-10 gap-y-1.5 items-baseline mb-[clamp(20px,4vh,40px)] fade-seq">
          <p className="type-meta m-0">Product engineering studio, Ahmedabad and Vancouver</p>
          <p className="type-meta m-0">Building since 2016</p>
          <p className="type-meta m-0">40+ systems in production</p>
        </div>

        <h1 className="type-display text-[var(--ink-cut)]">
          <span className="reveal-line"><span>Software that</span></span>
          <span className="reveal-line"><span>holds up when</span></span>
          <span className="reveal-line">
            <span>
              <em className="not-italic text-[var(--foreground)]" style={{ textShadow: "0 1px 0 rgba(255,255,255,.35), 0 -1px 2px rgba(0,0,0,.9)" }}>
                the load arrives.
              </em>
            </span>
          </span>
        </h1>

        <div className="mt-[clamp(24px,4.4vh,46px)] flex flex-col items-start gap-5 max-w-[min(56ch,58%)] max-lg:max-w-none">
          <p className="type-lede fade-seq">
            We build the platforms and internal systems that companies run on
            — then stay on to keep them running. No handover into a vacuum.
          </p>
          <div className="flex gap-3 flex-wrap fade-seq">
            <Link href="/contact" className={buttonVariants({ variant: "solid" })}>Start a project</Link>
            <Link href="/portfolio" className={buttonVariants({ variant: "plate" })}>See the work</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
