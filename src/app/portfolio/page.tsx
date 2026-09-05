import { Metadata } from "next";
import { Globe } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubpageHero } from "@/components/layout/SubpageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Our Portfolio | Aroh IT Solutions",
  description: "Browse our latest projects and client websites developed by Aroh IT Solutions.",
};

const projects = [
  {
    title: "Fleurvine",
    url: "https://fleurvine.in",
    displayUrl: "fleurvine.in",
    description: "An elegant online boutique florist featuring an extensive catalog of fresh flower arrangements, custom bouquets, and a seamless delivery scheduling system.",
    image: "/portfolio/fleuvine.png",
    tags: ["E-Commerce", "Web Development", "Florist", "UI/UX Design", "Next.js"],
    icon: Globe
  },
  {
    title: "Le Petale D'or",
    url: "https://lepetaledor.com",
    displayUrl: "lepetaledor.com",
    description: "A premium digital storefront presenting luxury floral designs, bespoke event arrangements, subscription packages, and high-conversion checkouts.",
    image: "/portfolio/lepetaledor.png",
    tags: ["E-Commerce", "Custom Theme", "Florist", "UI/UX Design", "Next.js"],
    icon: Globe
  },
  {
    title: "Sun Furniture Outlet",
    url: "https://sunfurnitureoutlet.co.uk",
    displayUrl: "sunfurnitureoutlet.co.uk",
    description: "A robust, scalable furniture retail website showcasing dynamic product filtering, heavy logistics integration, and multi-gateway secure checkout.",
    image: "/portfolio/sunfurniture.png",
    tags: ["Retail E-Commerce", "Product Catalogs", "Web Architecture", "UK Store", "Shopify Store"],
    icon: Globe
  },
  {
    title: "Fleurvine SEO Campaign",
    url: "https://fleurvine.in",
    displayUrl: "fleurvine.in",
    description: "Executed a comprehensive SEO optimization campaign that dramatically boosted search engine visibility, improved keyword rankings, resolved crawl errors using Google Search Console, and drove a major increase in organic customer acquisitions.",
    image: "/portfolio/fleurvineseo.png",
    tags: ["SEO", "Google Search Engine Optimization", "Google Search Console"],
    icon: Globe
  }
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <SubpageHero 
        title={<>Our Portfolio</>}
        description="Discover how we help brands grow, digitize their operations, and build high-performance web products that engage customers globally."
      />

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <FadeIn key={index} delay={index * 0.1} className="flex flex-col h-full">
                <Card 
                  className="group flex flex-col justify-between h-full bg-transparent shadow-none"
                  style={{ boxShadow: "none" }}
                >
                  <div>
                    {/* Image Container */}
                    <div 
                      className="relative aspect-[16/10] overflow-hidden bg-plate transition-all duration-[400ms] ease-[cubic-bezier(.2,.7,.25,1)] group-hover:-translate-y-[3px]"
                      style={{ 
                        borderRadius: "10px", 
                        boxShadow: "var(--bevel), var(--lift-1)" 
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top img-machined"
                        priority={false}
                      />
                    </div>

                    <CardHeader className="pt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded bg-primary/10 text-primary">
                          <project.icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{project.displayUrl}</span>
                      </div>
                      <CardTitle className="type-h3 text-foreground transition-colors mt-2">
                        {project.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <CardDescription className="text-base text-muted-foreground leading-relaxed">
                        {project.description}
                      </CardDescription>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, tIndex) => (
                          <span 
                            key={tIndex} 
                            className="px-[.7rem] py-[.34rem] rounded-[var(--radius-sm)] text-[.8125rem] text-muted-foreground bg-plate"
                            style={{ boxShadow: "var(--recess)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  {/* Footer link */}
                  <div className="p-6 pt-0 mt-auto">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={buttonVariants({ 
                        variant: "plate", 
                        className: "w-full justify-between" 
                      })}
                    >
                      <span>Visit Website</span>
                    </a>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
