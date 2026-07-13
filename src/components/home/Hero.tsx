"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Globe } from "./Globe";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#003366] min-h-[100dvh] flex flex-col justify-center">

      {/* 
        LAYER 0: The Globe Background
        Positioned absolutely to the right side of the screen.
      */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 lg:right-[5%] w-[100%] md:w-[80%] lg:w-[50%] max-w-[800px] h-full flex items-center justify-center opacity-40 lg:opacity-100 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full aspect-square"
        >
          <Globe />
        </motion.div>
      </div>

      {/* 
        LAYER 1: The Fade / Colour Overlays (z-10)
        These sit on top of the globe but BEHIND the text.
        Fades from #003366 on the left to transparent on the right, 
        hiding the left half of the globe seamlessly.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-[#003366]/90 via-40% to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#003366] via-transparent to-[#003366] pointer-events-none z-10" />

      {/* 
        LAYER 2: The Content Container (z-20)
        This is placed above the gradients so the text is fully visible and readable.
      */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 grid lg:grid-cols-2 items-center gap-12 pt-20 pb-20">

        {/* Left Column: Text aligned to the left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left space-y-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8F9FA] leading-tight">
            Modern Solutions for a Digital World
          </h1>

          <p className="text-xl md:text-2xl text-[#F8F9FA]/80 max-w-xl leading-relaxed">
            Empowering your brand with custom website development, targeted digital marketing, and powerful e-commerce solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Link href="/contact" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto h-14 px-8 text-base group bg-[#F8F9FA] text-[#003366] hover:bg-[#F8F9FA]/90" })}>
              Get a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto h-14 px-8 text-base border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#003366] shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300" })}>
              Explore Our Services
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Empty to allow the background globe to show through */}
        <div className="hidden lg:block w-full h-full pointer-events-none" />

      </div>
    </section>
  );
}
