import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

const BASE_CLASS =
  "inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-100 ring-1 ring-sky-500/40";
const DOT_CLASS =
  "mr-2 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]";

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <p className={`${BASE_CLASS} ${className}`.trim()}>
      <span className={DOT_CLASS} aria-hidden />
      {children}
    </p>
  );
}
