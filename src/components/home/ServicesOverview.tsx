"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorSmartphone, ShoppingCart, Search, Megaphone, PenTool, Wrench } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const services = [
  {
    title: "Custom Website Development",
    description: "Fast, responsive websites tailored to your business goals and brand identity.",
    icon: MonitorSmartphone,
  },
  {
    title: "E-Commerce Solutions",
    description: "Build powerful online stores with Shopify, WordPress, or custom full-stack solutions.",
    icon: ShoppingCart,
  },
  {
    title: "SEO Optimization",
    description: "Improve your search rankings and attract more organic traffic from Google.",
    icon: Search,
  },
  {
    title: "Digital Marketing",
    description: "Grow your brand with targeted campaigns across search engines and social media.",
    icon: Megaphone,
  },
  {
    title: "Graphic Design & Branding",
    description: "Create professional logos, marketing materials, and visuals that leave a lasting impression.",
    icon: PenTool,
  },
  {
    title: "Website Maintenance & Support",
    description: "Keep your website secure, updated, and performing at its best with ongoing support.",
    icon: Wrench,
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-[#003366]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Our Services</h2>
            <p className="text-lg text-white/80">
              Comprehensive IT solutions designed to drive innovation, optimize processes, and secure your digital assets.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="h-full border-white/10 bg-white/5 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:-translate-y-1 shadow-lg"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-white/80">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg", className: "border-white text-[#03366] hover:bg-white hover:text-[#003366]" })}>
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
