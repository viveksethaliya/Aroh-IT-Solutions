"use client";

import { useState } from "react";

export function ServicesOverview() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const capabilities = [
    {
      title: "Web platforms",
      tag: "Customer portals, marketplaces, internal tools",
      desc: "Applications that carry real transaction volume and real permissions. We start from your data model rather than your page list, because the screens will change and the model will not. Typical engagement runs 10 to 16 weeks to first production release, with usable staging builds from week three.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Vercel"]
    },
    {
      title: "Mobile applications",
      tag: "iOS and Android from one codebase",
      desc: "Cross-platform builds where the business logic is shared and only the interface layer diverges. We handle store submission, release signing, and crash reporting setup, and we hand you the certificates rather than holding them.",
      tech: ["React Native", "Expo", "TypeScript", "Firebase", "Sentry"]
    },
    {
      title: "Systems integration",
      tag: "Connecting tools you already pay for",
      desc: "Most operational pain is not a missing tool, it is four tools that do not talk. We map where data is re-typed by hand, then close those gaps with queued, retryable jobs rather than brittle one-way webhooks. Usually the fastest return of anything we do.",
      tech: ["REST", "GraphQL", "Webhooks", "Queues", "Shopify", "QuickBooks", "HubSpot"]
    },
    {
      title: "Infrastructure and support",
      tag: "Hosting, monitoring, and the on-call rota",
      desc: "Deployment pipelines, environment separation, backups that have actually been restored at least once, and alerting that pages a human. Available as a retainer after launch or as a rescue engagement on a system somebody else built.",
      tech: ["Docker", "GitHub Actions", "AWS", "Cloudflare", "Grafana"]
    }
  ];

  return (
    <section id="capabilities" className="py-[clamp(80px,12vh,150px)] bg-background">
      <div className="wrap">
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-[clamp(20px,5vw,72px)] items-end mb-[clamp(34px,6vh,64px)] max-[820px]:grid-cols-1 max-[820px]:items-start max-[820px]:gap-4 obs">
          <h2 className="type-h2 max-w-[16ch] max-[820px]:max-w-none text-foreground">
            What we build
          </h2>
          <p className="type-body pb-[.45rem]">
            Four practices. Most projects use two of them. Open one to see how we scope it.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 obs">
          {capabilities.map((cap, i) => {
            const isOpen = openIndex === i;
            return (
              <article 
                key={i} 
                className={`rounded-[var(--radius-md)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(.2,.7,.25,1)] ${isOpen ? "open" : ""}`}
                style={{
                  background: isOpen ? "var(--high)" : "var(--raised)",
                  boxShadow: isOpen ? "var(--bevel-strong), var(--lift-2)" : "var(--bevel)"
                }}
              >
                <button 
                  className="w-full bg-none border-0 cursor-pointer text-left grid grid-cols-[1fr_auto] items-center gap-6 px-[clamp(20px,2.8vw,34px)] py-[clamp(20px,2.6vw,30px)] hover:bg-[var(--high)] hover:shadow-[var(--bevel-strong),var(--lift-2)]"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span className="flex items-baseline gap-[1.1rem] flex-wrap">
                    <span className="type-h3 text-foreground" style={{ fontVariationSettings: '"wdth" 88,"wght" 620' }}>
                      {cap.title}
                    </span>
                    <span className="text-[.8125rem] text-muted-foreground">{cap.tag}</span>
                  </span>
                  
                  {/* The milled plus/minus knob */}
                  <span 
                    className="flex-none w-[38px] h-[38px] rounded-full relative grid place-items-center transition-all duration-300 ease-[cubic-bezier(.2,.7,.25,1)]"
                    style={{
                      background: isOpen ? "linear-gradient(180deg,var(--n-900),var(--n-700))" : "linear-gradient(180deg,var(--tertiary),var(--high))",
                      boxShadow: "var(--bevel), 0 2px 6px rgba(0,0,0,.6)",
                      transform: isOpen ? "rotate(180deg)" : "none"
                    }}
                    aria-hidden="true"
                  >
                    <span 
                      className="absolute rounded-[1px] transition-all duration-[400ms] ease-[cubic-bezier(.2,.7,.25,1)]"
                      style={{
                        width: "13px", height: "1.5px",
                        background: isOpen ? "var(--background)" : "var(--foreground)"
                      }}
                    />
                    <span 
                      className="absolute rounded-[1px] transition-all duration-[400ms] ease-[cubic-bezier(.2,.7,.25,1)]"
                      style={{
                        width: "1.5px", height: "13px",
                        background: isOpen ? "var(--background)" : "var(--foreground)",
                        opacity: isOpen ? 0 : 1,
                        transform: isOpen ? "scaleY(0)" : "scaleY(1)"
                      }}
                    />
                  </span>
                </button>
                
                <div 
                  className="grid transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(.2,.7,.25,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-[clamp(20px,2.8vw,34px)] pb-[clamp(24px,3vw,34px)] grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-[clamp(20px,3vw,48px)] max-[760px]:grid-cols-1">
                      <p className="m-0 text-muted-foreground max-w-[60ch]">
                        {cap.desc}
                      </p>
                      <ul className="list-none m-0 p-0 flex flex-wrap gap-1.5 content-start">
                        {cap.tech.map(t => (
                          <li 
                            key={t}
                            className="px-[.7rem] py-[.34rem] rounded-[var(--radius-sm)] text-[.8125rem] text-muted-foreground bg-plate"
                            style={{ boxShadow: "var(--recess)" }}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
