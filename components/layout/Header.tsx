"use client";

import Link from "next/link";
import { useAppKit } from "@reown/appkit/react";
import { Baton } from "@/components/ui/Baton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null && "message" in err) return String((err as { message?: unknown }).message);
  return String(err);
}

export function Header() {
  const { open } = useAppKit();

  const handleGoToApp = () => {
    try {
      if (typeof open !== "function") return;
      const result = open();
      if (result && typeof (result as Promise<unknown>).catch === "function") {
        (result as Promise<unknown>).catch((err: unknown) => {
          console.error("WalletConnect:", getErrorMessage(err));
        });
      }
    } catch (err) {
      console.error("WalletConnect:", getErrorMessage(err));
    }
  };

  return (
    <header className="sticky top-0 z-20 mx-auto max-w-6xl bg-black/60 px-6 pt-4 backdrop-blur-md md:px-10 lg:px-16">
      <div className="flex flex-col items-center gap-4 rounded-full border border-white/10 bg-black/60 px-6 py-3 shadow-lg shadow-black/40 backdrop-blur-md md:flex-row md:justify-between">
        <nav
          className="flex flex-1 items-center justify-between gap-4"
          aria-label="Main"
        >
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
          <Baton onClick={handleGoToApp}>
            Go to app
          </Baton>
        </nav>
      </div>
    </header>
  );
}
