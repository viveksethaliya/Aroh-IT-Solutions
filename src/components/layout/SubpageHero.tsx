"use client";

import { motion } from "framer-motion";

interface SubpageHeroProps {
  title: React.ReactNode;
  description: string;
}

export function SubpageHero({ title, description }: SubpageHeroProps) {
  return (
    <section className="bg-[#003366] py-8 md:py-4 min-h-[280px] md:min-h-[360px] flex items-center justify-center relative overflow-hidden text-center">
      {/* Background SVG wave patterns moving in a circular motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Wave 1 - spinning clockwise */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vmax] h-[180vmax] opacity-[0.06] animate-[spin_80s_linear_infinite]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-white" />
          </svg>
        </div>
        {/* Wave 2 - spinning counter-clockwise for dynamic morphing overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] opacity-[0.03] animate-[spin_55s_linear_infinite_reverse]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-white" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-base md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
