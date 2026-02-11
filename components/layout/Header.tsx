import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-4 z-20 mx-auto max-w-6xl px-6 pt-4 md:px-10 lg:px-16">
      <div className="flex flex-col items-center gap-4 rounded-full border border-white/10 bg-black/60 px-6 py-3 shadow-lg shadow-black/40 backdrop-blur-md md:flex-row md:justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition hover:opacity-90"
        >
          <span
            className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            aria-hidden
          />
          <span className="text-sm font-semibold tracking-[0.25em] uppercase text-sky-200">
            My Project Store
          </span>
        </Link>
        <nav className="flex flex-1 items-center justify-between gap-4 md:ml-8" aria-label="Main">
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-200">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition hover:text-sky-300"
              >
                {label}
              </Link>
            ))}
          </div>
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400"
          >
            Go to app
          </Link>
        </nav>
      </div>
    </header>
  );
}
