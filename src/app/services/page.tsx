import { Metadata } from "next";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorSmartphone, ShoppingCart, Search, Megaphone, PenTool, Wrench } from "lucide-react";
import Link from "next/link";
import { ServiceImage } from "./service-image";

export const metadata: Metadata = {
  title: "Our Services | Shree IT Solutions",
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
    <div className="flex flex-col min-h-screen pt-16">

      {/* Header */}
      <section className="bg-background py-20 border-b">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Comprehensive <span className="text-primary">Digital Services</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            We provide end-to-end digital solutions designed to elevate your brand, engage your customers, and drive sustainable growth online.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-24">
            {allServices.map((service, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text */}
                <div className="order-2 lg:order-1 flex flex-col space-y-6">
                  <div className="h-16 w-16 squircle squircle-sm bg-primary/10 flex items-center justify-center mb-2">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{service.title}</h3>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="pt-2">
                    <Link href="/contact" className={buttonVariants({ variant: "default", size: "lg" })}>
                      Discuss Your Project
                    </Link>
                  </div>
                </div>
                <ServiceImage src={service.image} alt={service.title} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to discuss your specific requirements and find out how we can help your business thrive.
          </p>
          <Link href="/contact" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  );
}
