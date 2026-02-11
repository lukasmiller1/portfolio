import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const BASE_CLASS =
  "rounded-2xl border border-white/10 bg-black/60 p-4 shadow-md";

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`${BASE_CLASS} ${className}`.trim()}>
      {children}
    </div>
  );
}
