"use client";

import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-20 mx-auto max-w-6xl bg-black/60 px-6 pt-4 backdrop-blur-md md:px-10 lg:px-16">
      <div className="flex flex-col items-center gap-4 rounded-full border border-white/10 bg-black/60 px-6 py-3 shadow-lg shadow-black/40 backdrop-blur-md md:flex-row md:justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-white transition hover:text-sky-300"
        >
          Prime Nexus
        </Link>
        <nav
          className="flex items-center gap-6"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-base font-medium text-zinc-200 transition hover:text-sky-300"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
