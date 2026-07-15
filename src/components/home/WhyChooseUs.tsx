"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const benefits = [
  "Expert Team of Developers & Engineers",
  "Tailored Solutions for Your Business",
  "Commitment to Quality & Security",
  "24/7 Dedicated Support & Maintenance",
  "Proven Track Record of Success",
  "Agile & Transparent Processes",
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Why Partner with <span className="text-primary">Aroh IT Solutions?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We don&apos;t just build software; we build partnerships. Our team takes the time to understand your unique challenges and crafts technology solutions that drive real business value and growth.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-base font-medium text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            className="relative h-[500px] w-full rounded-2xl overflow-hidden bg-muted/50 border border-border"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background design accents */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-500/10 backdrop-blur-md" />
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                {/* Collaboration Image */}
                <div className="relative overflow-hidden rounded-xl shadow-md border border-border/50 group bg-card">
                  <Image 
                    src="/why-choose-us-collaboration.png" 
                    alt="Team Collaboration" 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Workspace Image */}
                <div className="relative overflow-hidden rounded-xl shadow-md border border-border/50 group bg-card">
                  <Image 
                    src="/why-choose-us-workspace.png" 
                    alt="Developer Workspace" 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Dashboard Image */}
                <div className="relative overflow-hidden rounded-xl shadow-md border border-border/50 col-span-2 group bg-card">
                  <Image 
                    src="/why-choose-us-dashboard.png" 
                    alt="Performance Dashboard" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
