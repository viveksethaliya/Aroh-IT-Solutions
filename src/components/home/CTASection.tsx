"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section 
      className="py-24 relative overflow-hidden text-foreground"
      style={{ background: "var(--raised)", boxShadow: "var(--bevel-strong), var(--lift-2), inset 0 1px 0 rgba(255,255,255,.06)" }}
    >
      
      <div className="wrap relative z-10">
        <div className="max-w-3xl space-y-8 obs">
          <h2 className="type-h2">
            Tell us what is breaking
          </h2>
          <p className="type-body text-muted-foreground pb-[1.2rem] max-w-[65ch]">
            Send the shape of the problem and we will reply within one business day 
            with a first read and an honest note on whether we are the right team for it.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-start gap-4">
            <Link href="/contact" className={buttonVariants({ variant: "solid" })}>
              Start a project
            </Link>
          </div>
          </div>
      </div>
    </section>
  );
}
