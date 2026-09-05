import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background" style={{ paddingTop: "clamp(46px,7vh,80px)", paddingBottom: "34px" }}>
      <div className="wrap">
        <div 
          className="grid gap-[clamp(24px,4vw,50px)] pb-11"
          style={{ gridTemplateColumns: "1.6fr repeat(3, minmax(0,1fr))" }}
        >
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-baseline gap-[.55rem] mb-4">
              <b className="text-[1.35rem] tracking-[-.01em] text-foreground" style={{ fontVariationSettings: '"wdth" 78,"wght" 700' }}>Aroh</b>
              <span className="text-[.75rem] text-muted-foreground" style={{ fontVariationSettings: '"wdth" 100,"wght" 400' }}>IT Solutions</span>
            </Link>
            <p className="type-meta max-w-[34ch]">
              A product engineering studio building operational software for companies that have outgrown their tools.
            </p>
          </div>

          {/* Capabilities */}
          <div>
            <h2 className="mb-4" style={{ fontSize: ".8125rem", color: "var(--muted-foreground)", fontVariationSettings: '"wdth" 100,"wght" 500' }}>Capabilities</h2>
            <ul className="list-none m-0 p-0 grid gap-[.6rem]">
              <li><Link href="/services" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">Web platforms</Link></li>
              <li><Link href="/services" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">Mobile applications</Link></li>
              <li><Link href="/services" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">Systems integration</Link></li>
              <li><Link href="/services" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">Infrastructure</Link></li>
            </ul>
          </div>

          {/* Studio */}
          <div>
            <h2 className="mb-4" style={{ fontSize: ".8125rem", color: "var(--muted-foreground)", fontVariationSettings: '"wdth" 100,"wght" 500' }}>Studio</h2>
            <ul className="list-none m-0 p-0 grid gap-[.6rem]">
              <li><Link href="/#process" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">How we work</Link></li>
              <li><Link href="/portfolio" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">Work</Link></li>
              <li><Link href="/contact" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">Contact</Link></li>
              <li><Link href="/" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">Careers</Link></li>
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <h2 className="mb-4" style={{ fontSize: ".8125rem", color: "var(--muted-foreground)", fontVariationSettings: '"wdth" 100,"wght" 500' }}>Elsewhere</h2>
            <ul className="list-none m-0 p-0 grid gap-[.6rem]">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">GitHub</a></li>
              <li><a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="block py-[14px] -my-[14px] text-[.94rem] text-muted-foreground hover:text-foreground transition-colors duration-200 relative z-10">Dribbble</a></li>
            </ul>
          </div>
        </div>

        {/* Base */}
        <div 
          className="flex justify-between flex-wrap gap-4 pt-[26px]"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.07)" }}
        >
          <p className="type-meta m-0">&copy; 2026 Aroh IT Solutions</p>
          <p className="type-meta m-0">Privacy &nbsp;&nbsp; Terms</p>
        </div>
      </div>
    </footer>
  );
}
