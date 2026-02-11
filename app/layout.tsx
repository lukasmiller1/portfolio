import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { AppKitProvider } from "@/context/appkit";
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
        <div className="min-h-screen bg-[radial-gradient(circle_at_bottom,_#151b27,_#050608_55%)] text-zinc-50">
          <div
            className="fixed inset-0 -z-10 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-60"
            aria-hidden
          />
          <div className="relative z-10 backdrop-blur-[2px]">
            <AppKitProvider>
              <Header />
              {children}
            </AppKitProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
