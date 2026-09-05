"use client";


interface SubpageHeroProps {
  title: React.ReactNode;
  description: string;
}

export function SubpageHero({ title, description }: SubpageHeroProps) {
  return (
    <section
      className="bg-plate py-8 md:py-4 min-h-[280px] md:min-h-[360px] flex items-center relative overflow-hidden"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}
    >
      <div className="wrap w-full relative z-10 max-w-4xl">
        <h1 className="type-h2 text-foreground mb-4 md:mb-6 obs">
          {title}
        </h1>
        <p className="type-lede obs" style={{ transitionDelay: "0.1s" }}>
          {description}
        </p>
      </div>
    </section>
  );
}
