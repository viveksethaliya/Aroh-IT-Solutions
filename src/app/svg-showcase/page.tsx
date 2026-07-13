import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVG Assets | Aroh IT Solutions",
  description: "Internal showcase of all SVG assets in the project.",
};

const svgs = [
  { name: "Artboard 1", file: "/Artboard 1.svg" },
  { name: "Artboard 2", file: "/Artboard 2.svg" },
  { name: "Artboard 3", file: "/Artboard 3.svg" },
  { name: "Artboard 4", file: "/Artboard 4.svg" },
  { name: "Artboard 5", file: "/Artboard 5.svg" },
  { name: "Artboard 6", file: "/Artboard 6.svg" },
  { name: "Artboard 7", file: "/Artboard 7.svg" },
  { name: "Artboard 8", file: "/Artboard 8.svg" },
];

export default function SvgShowcasePage() {
  return (
    <div className="flex flex-col min-h-screen pt-16 bg-muted/30">

      {/* Header */}
      <section className="bg-background py-14 border-b">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            SVG <span className="text-primary">Asset Showcase</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            All {svgs.length} SVG assets available in the project's public folder.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {svgs.map((svg) => (
              <div
                key={svg.file}
                className="group flex flex-col rounded-2xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Preview area — checkerboard to show transparency */}
                <div
                  className="flex items-center justify-center p-8 min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <img
                    src={svg.file}
                    alt={svg.name}
                    className="max-h-[180px] max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info bar */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/40">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {svg.name}
                  </span>
                  <a
                    href={svg.file}
                    download
                    className="text-xs font-medium text-primary hover:underline ml-3 whitespace-nowrap"
                  >
                    ↓ Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
