import { Metadata } from "next";
import { Target, Lightbulb, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/home/CTASection";

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
        title={<>Driving Digital Transformation</>}
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
                  <h2 className="type-h4">{value.title}</h2>
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
                <h2 className="type-h2 mb-6">Our Story</h2>
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
              <div
                className="h-80 rounded-[10px] flex items-center justify-center p-8 relative overflow-hidden"
                style={{ background: "var(--raised)", boxShadow: "var(--bevel), var(--lift-1)" }}
              >
                <span className="relative z-10 type-meta">Team Photo Placeholder</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection />

    </div>
  );
}
