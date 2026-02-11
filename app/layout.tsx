import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
          {/* NOTE: Place your starfield image at public/stars-bg.png */}
          <div className="fixed inset-0 -z-10 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-60" />
          <div className="relative z-10 backdrop-blur-[2px]">
            <header className="sticky top-4 z-20 mx-auto max-w-6xl px-6 pt-4 md:px-10 lg:px-16">
              <div className="flex flex-col items-center gap-4 rounded-full border border-white/10 bg-black/60 px-6 py-3 shadow-lg shadow-black/40 backdrop-blur-md md:flex-row md:justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                  <span className="text-sm font-semibold tracking-[0.25em] uppercase text-sky-200">
                    My Project Store
                  </span>
                </div>
                <nav className="flex flex-1 items-center justify-between gap-4 md:ml-8">
                  <div className="flex items-center gap-6 text-sm font-medium text-zinc-200">
                    <a href="/" className="transition hover:text-sky-300">
                      Home
                    </a>
                    <a href="/about" className="transition hover:text-sky-300">
                      About
                    </a>
                    <a href="/contact" className="transition hover:text-sky-300">
                      Contact
                    </a>
                  </div>
                  <a
                    href="/app"
                    className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400"
                  >
                    Go to app
                  </a>
                </nav>
              </div>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
