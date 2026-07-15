import { Metadata } from "next";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorSmartphone, ShoppingCart, Search, Megaphone, PenTool, Wrench } from "lucide-react";
import Link from "next/link";
import { ServiceImage } from "./service-image";
import { cn } from "@/lib/utils";
import { SubpageHero } from "@/components/layout/SubpageHero";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Our Services | Aroh IT Solutions",
  description: "Explore our comprehensive range of digital services and solutions.",
};

const allServices = [
  {
    title: "Custom Website Development",
    description: "Fast, responsive websites tailored to your business goals and brand identity.",
    icon: MonitorSmartphone,
    image: "/services/Custom-Website.webp"
  },
  {
    title: "E-Commerce Solutions",
    description: "Build powerful online stores with Shopify, WordPress, or custom full-stack solutions.",
    icon: ShoppingCart,
    image: "/services/e-commerce.webp"
  },
  {
    title: "SEO Optimization",
    description: "Improve your search rankings and attract more organic traffic from Google.",
    icon: Search,
    image: "/services/SEO.webp"
  },
  {
    title: "Digital Marketing",
    description: "Grow your brand with targeted campaigns across search engines and social media.",
    icon: Megaphone,
    image: "/services/digital-marketing.webp"
  },
  {
    title: "Graphic Design & Branding",
    description: "Create professional logos, marketing materials, and visuals that leave a lasting impression.",
    icon: PenTool,
    image: "/services/graphic-designing.webp"
  },
  {
    title: "Website Maintenance & Support",
    description: "Keep your website secure, updated, and performing at its best with ongoing support.",
    icon: Wrench,
    image: "/services/maintainance.webp"
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <SubpageHero 
        title={<>Comprehensive <span className="text-blue-300">Digital Services</span></>}
        description="From custom web applications to strategic digital marketing, we provide end-to-end solutions to help your business thrive online."
      />

      {/* Services List */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-16 md:gap-28">
            {allServices.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <FadeIn key={index} delay={0.1} viewportMargin="-100px">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Column: Text */}
                    <div className={cn(
                      "flex flex-col space-y-6",
                      isEven ? "lg:order-1" : "lg:order-2"
                    )}>
                      <div className="h-16 w-16 squircle squircle-sm bg-primary/10 flex items-center justify-center mb-2">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{service.title}</h3>
                      
                      {/* Mobile Image: sits under the title on mobile, hidden on desktop */}
                      <ServiceImage 
                        src={service.image} 
                        alt={service.title} 
                        className="block lg:hidden p-0 py-2"
                      />

                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <div className="pt-2">
                        <Link 
                          href="/contact" 
                          className={cn(
                            buttonVariants({ variant: "default", size: "lg" }), 
                            "w-full sm:w-auto text-center"
                          )}
                        >
                          Discuss Your Project
                        </Link>
                      </div>
                    </div>

                    {/* Desktop Image: alternates on desktop, hidden on mobile */}
                    <ServiceImage 
                      src={service.image} 
                      alt={service.title} 
                      className={cn(
                        "hidden lg:block",
                        isEven ? "lg:order-2" : "lg:order-1"
                      )}
                    />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Contact us today to discuss your specific requirements and find out how we can help your business thrive.
            </p>
            <Link href="/contact" className={buttonVariants({ size: "lg", variant: "secondary" })}>
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
