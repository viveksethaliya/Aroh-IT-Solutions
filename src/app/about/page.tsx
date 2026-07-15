import { Metadata } from "next";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Target, Lightbulb, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "About Us | Aroh IT Solutions",
  description: "Learn about our mission, vision, and the team behind Aroh IT Solutions.",
};

import { SubpageHero } from "@/components/layout/SubpageHero";

const values = [
  {
    title: "Our Mission",
    description: "To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital landscape.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description: "To be the globally recognized leader in IT consulting and software development, known for our excellence, integrity, and transformative impact.",
    icon: Lightbulb,
  },
  {
    title: "Our Values",
    description: "We believe in transparency, continuous learning, and placing our clients' success at the core of everything we do.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <SubpageHero 
        title={<>Driving Digital <span className="text-blue-300">Transformation</span></>}
        description="Since our inception, Aroh IT Solutions has been at the forefront of technological innovation, helping businesses of all sizes navigate the complexities of the digital world."
      />

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-background border border-border/50 h-full">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left" duration={0.6}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    What started as a small team of passionate developers has grown into a full-scale IT solutions provider. We realized early on that technology is only as good as the problems it solves.
                  </p>
                  <p>
                    Today, we partner with enterprises and startups alike, bringing their visions to life through scalable architecture, beautiful design, and robust engineering.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" duration={0.6}>
              <div className="h-80 bg-background rounded-2xl border border-border flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20" />
                <span className="relative z-10 text-2xl font-bold text-foreground opacity-50">Team Photo Placeholder</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#003366] text-center">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Work Together?</h2>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-black text-white hover:bg-black")}>
              Contact Our Team
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
