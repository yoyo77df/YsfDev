import type { Metadata } from "next";
import { Inter, Outfit, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { AnimatedBackground } from "@/components/background/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YSF | Portfolio",
  description: "Modern portfolio of YSF - Web, App, Game, and Server Developer.",
  keywords: ["YSF", "Portfolio", "Developer", "Web Developer", "Next.js", "React"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${outfit.variable} ${cairo.variable} scroll-smooth`}>
      <body className="antialiased bg-[#030014] text-neutral-200 font-sans overflow-y-scroll overflow-x-hidden">
        <LanguageProvider>
          <AnimatedBackground />
          <Navbar />
          <main className="relative z-10 flex min-h-screen flex-col items-center justify-between">
            {children}
          </main>
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
