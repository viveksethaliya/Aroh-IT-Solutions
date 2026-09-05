import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { Toaster } from "@/components/ui/sonner";
import { RevealInit } from "@/components/ui/RevealInit";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aroh IT Solutions | Product Engineering Studio",
  description: "We build the platforms and internal systems that companies run on — then stay on to keep them running. No handover into a vacuum.",
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_KEY",
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
        {/* Placeholder for Google Analytics. Replace G-XXXXXXXXXX with actual ID */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
