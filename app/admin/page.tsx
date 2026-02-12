"use client";

import { useCallback, useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { Card } from "@/components/ui/Card";
import { ToastContainer, type ToastItem } from "@/components/admin/ToastContainer";

type AdminTab = "project" | "user" | "team" | "contact" | "about";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "project", label: "Project" },
  { id: "user", label: "User" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
  { id: "about", label: "About" },
];

const TOAST_DURATION_MS = 4000;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("project");
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <PageContainer className="gap-8 pt-16">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <section className="space-y-3">
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Admin
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-200">
          Internal tools for managing projects, users, team information, contact
          details, and about content for this site.
        </p>
      </section>

      <nav
        aria-label="Admin sections"
        className="flex flex-wrap gap-2 text-xs font-medium text-zinc-300"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-3 py-1.5 transition ${
                isActive
                  ? "border-sky-400 bg-sky-500/20 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                  : "border-white/10 bg-black/40 hover:border-sky-400/60 hover:text-sky-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {activeTab === "project" && <PlaceholderSection title="Project" />}
      {activeTab === "user" && <PlaceholderSection title="User" />}
      {activeTab === "team" && <PlaceholderSection title="Team" />}
      {activeTab === "contact" && <PlaceholderSection title="Contact" />}
      {activeTab === "about" && <PlaceholderSection title="About" />}
    </PageContainer>
  );
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <Card className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-50">
        {title} management
      </h2>
      <p className="text-xs text-zinc-300">
        This tab is reserved for future {title.toLowerCase()} management tools.
        You can add forms and tables here when you are ready to manage this
        data from the admin panel.
      </p>
    </Card>
  );
}
