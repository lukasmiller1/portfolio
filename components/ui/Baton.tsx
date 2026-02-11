"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BatonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Baton({ children, className = "", ...rest }: BatonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400 ${className}`.trim()}
    >
      {children}
    </button>
  );
}

