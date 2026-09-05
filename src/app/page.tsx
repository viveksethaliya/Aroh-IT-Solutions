import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ProcessRail } from "@/components/home/ProcessRail";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Aroh IT Solutions | Product Engineering Studio",
  description: "A product engineering studio building operational software for companies that have outgrown their tools. Web platforms, mobile apps, and systems integration.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Statement Band — two-column, left-aligned, exact reference copy */}
      <section className="py-[clamp(80px,12vh,150px)] bg-plate obs" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}>
        <div className="wrap">
          <div className="grid items-start gap-[clamp(28px,5vw,80px)] max-[900px]:grid-cols-1" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1.35fr)" }}>
            <h2 className="type-h2 text-foreground obs">Most software fails on the second year, not the first.</h2>
            <div className="obs">
              <p className="m-0 mb-[1.1rem] text-muted-foreground" style={{ fontSize: "clamp(1.15rem,2vw,1.55rem)", lineHeight: 1.45, fontVariationSettings: '"wdth" 100,"wght" 350' }}>
                Launching is the easy part. The hard part is the system still being fast, still being understood by whoever inherits it, and still bending to a business that has changed since you scoped it.
              </p>
              <p className="m-0 text-muted-foreground" style={{ fontSize: "clamp(1.15rem,2vw,1.55rem)", lineHeight: 1.45, fontVariationSettings: '"wdth" 100,"wght" 350' }}>
                <strong className="text-foreground" style={{ fontVariationSettings: '"wdth" 100,"wght" 560' }}>We build for that second year.</strong>{" "}
                Boring architecture, tests that mean something, documentation a new developer can actually follow, and a support arrangement that does not evaporate at go-live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServicesOverview />
      <ProcessRail />
      <CTASection />
    </div>
  );
}
