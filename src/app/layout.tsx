import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { Toaster } from "@/components/ui/sonner";
import { RevealInit } from "@/components/ui/RevealInit";

const archivo = localFont({
  src: "./Archivo-Subset.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aroh-it-solutions.vercel.app"),
  title: {
    template: "%s | Aroh IT Solutions",
    default: "Aroh IT Solutions | Product Engineering Studio",
  },
  description: "A product engineering studio building operational software for companies that have outgrown their tools. Web platforms, mobile apps, and systems integration.",
  verification: {
    google: "BLh6XGol5xGwIfu5jbxojaEyOu6LsEed7642NqD2fEY",
  },
  openGraph: {
    type: "website",
    siteName: "Aroh IT Solutions",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
        <ThemeProvider
          defaultTheme="dark"
          attribute="class"
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Chatbot />
          <RevealInit />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
        {/* Render Google Analytics only if ID is a valid GA4 measurement ID */}
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID.startsWith("G-") && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
