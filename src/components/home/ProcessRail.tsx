"use client";

export function ProcessRail() {
  const stages = [
    {
      num: "1",
      title: "Discovery",
      desc: "One to two weeks. We interview the people who do the work today and write down what actually happens, including the spreadsheet nobody mentions in meetings."
    },
    {
      num: "2",
      title: "Architecture",
      desc: "Data model, integration map, and a written estimate broken down by module. You get this as a document you own, whether or not you continue with us."
    },
    {
      num: "3",
      title: "Build",
      desc: "Two-week cycles with a staging link that is always current. You see progress in the product, not in a status deck."
    },
    {
      num: "4",
      title: "Handover",
      desc: "Documentation, a runbook, and two weeks of paired work with whoever will own it next. Support retainer optional, never assumed."
    }
  ];

  return (
    <section id="process" className="py-[clamp(80px,12vh,150px)] bg-plate" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}>
      <div className="wrap">
        
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-[clamp(20px,5vw,72px)] items-end mb-[clamp(34px,6vh,64px)] max-md:grid-cols-1 max-md:items-start max-md:gap-4 obs">
          <h2 className="type-h2 max-w-[16ch] max-md:max-w-none text-foreground">
            How an engagement runs
          </h2>
          <p className="type-body pb-[.45rem]">
            Four stages, fixed in order. You can stop after any one of them and keep everything produced up to that point.
          </p>
        </div>

        {/* One billet, four milled bays */}
        <div 
          className="grid grid-cols-[repeat(4,minmax(0,1fr))] rounded-[var(--radius-lg)] overflow-hidden obs max-lg:grid-cols-2 max-md:grid-cols-1"
          style={{
            background: "linear-gradient(180deg,var(--high) 0%,var(--raised) 3%,var(--plate) 100%)",
            boxShadow: "var(--bevel-strong), var(--lift-2)"
          }}
        >
          {stages.map((stage) => (
            <div 
              key={stage.num}
              className="relative p-[clamp(26px,2.8vw,42px)_clamp(22px,2.2vw,34px)_clamp(60px,6vw,82px)] group [box-shadow:inset_0_1px_0_rgba(0,0,0,.85),inset_0_2px_0_rgba(255,255,255,.055)] md:[&:nth-child(n+3)]:max-lg:[box-shadow:inset_0_1px_0_rgba(0,0,0,.85),inset_0_2px_0_rgba(255,255,255,.055)] md:[&:nth-child(even)]:max-lg:[box-shadow:inset_1px_0_0_rgba(0,0,0,.85),inset_2px_0_0_rgba(255,255,255,.055)] lg:[&+&]:[box-shadow:inset_1px_0_0_rgba(0,0,0,.85),inset_2px_0_0_rgba(255,255,255,.055)] first:[box-shadow:none!important]"
            >


              <h3 className="m-0 mb-[.6rem] text-[1.12rem] text-foreground" style={{ fontVariationSettings: '"wdth" 94,"wght" 620' }}>
                {stage.title}
              </h3>
              <p className="m-0 text-[.94rem] text-muted-foreground leading-[1.56] max-w-[34ch]">
                {stage.desc}
              </p>
              <span 
                className="absolute right-[clamp(14px,1.4vw,22px)] bottom-[clamp(2px,1vw,10px)] type-etched pointer-events-none"
                aria-hidden="true"
              >
                {stage.num}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
