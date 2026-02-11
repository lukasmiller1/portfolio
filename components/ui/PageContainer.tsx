import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const CONTENT_CLASS =
  "mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-20 pt-8 text-zinc-50 md:px-10 lg:px-16";

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <main className={`${CONTENT_CLASS} ${className}`.trim()}>
      {children}
    </main>
  );
}
