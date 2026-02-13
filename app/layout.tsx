import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { WorldMapNetwork } from "@/components/background/WorldMapNetwork";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Projects Marketplace",
  description:
    "Sell and showcase games, scripts, bots, and website projects in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen text-zinc-50">
          {/* Single background layer: stars + map (stacked), behind content */}
          <div
            className="fixed inset-0 overflow-hidden"
            style={{ zIndex: 0 }}
            aria-hidden
          >
            <div
              className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-35"
              aria-hidden
            />
            <WorldMapNetwork />
          </div>
          {/* Content above background */}
          <div
            className="relative h-[100vh]"
            style={{ zIndex: 1 }}
          >
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
