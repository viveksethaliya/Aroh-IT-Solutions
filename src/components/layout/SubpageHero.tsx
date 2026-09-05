"use client";

import { motion } from "framer-motion";

interface SubpageHeroProps {
  title: React.ReactNode;
  description: string;
}

export function SubpageHero({ title, description }: SubpageHeroProps) {
  return (
    <section
      className="bg-plate py-8 md:py-4 min-h-[280px] md:min-h-[360px] flex items-center relative overflow-hidden"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}
    >
      <div className="wrap w-full relative z-10 max-w-4xl">
        <motion.h1
          className="type-h2 text-foreground mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="type-lede"
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
