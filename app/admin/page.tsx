"use client";

import { useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { Card } from "@/components/ui/Card";
import { useProjects } from "@/hooks/useProjects";
import type { ProjectType } from "@/types/project";

const PROJECT_TYPES: ProjectType[] = [
  "game",
  "script",
  "bot",
  "website",
  "other",
];

type AdminTab = "project" | "user" | "team" | "contact" | "about";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "project", label: "Project" },
  { id: "user", label: "User" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
  { id: "about", label: "About" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("project");

  return (
    <PageContainer className="gap-8 pt-16">
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

      {activeTab === "project" && <ProjectAdminSection />}
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

function ProjectAdminSection() {
  const [search, setSearch] = useState("");
  const { projects, loading, error } = useProjects(search);

  const [form, setForm] = useState({
    name: "",
    description: "",
    source: "",
    price: "",
    image: "",
    video: "",
    type: "game" as ProjectType,
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const priceNumber = Number(form.price);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim(),
          source: form.source.trim(),
          price: priceNumber,
          image: form.image.trim() || null,
          video: form.video.trim() || null,
          type: form.type,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error || "Failed to create project");
      }

      setForm({
        name: "",
        description: "",
        source: "",
        price: "",
        image: "",
        video: "",
        type: "game",
      });
    } catch (err) {
      console.error(err);
      setSaveError(
        err instanceof Error ? err.message : "Failed to create project"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="grid gap-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,2fr)]">
        <Card className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-zinc-50">
                Existing projects
              </h2>
              <p className="text-xs text-zinc-400">
                Filter by name or description.
              </p>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-zinc-200 outline-none placeholder:text-zinc-500 md:w-64"
            />
          </div>

          {loading && (
            <p className="text-xs text-zinc-400">Loading projects…</p>
          )}
          {error && (
            <p className="text-xs text-red-300">
              {error} (showing demo data if available)
            </p>
          )}

          <div className="mt-2 max-h-72 space-y-2 overflow-y-auto pr-1 text-xs">
            {projects.map((project) => (
              <div
                key={project._id}
                className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-black/40 px-3 py-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                      {project.type}
                    </span>
                    <span className="font-semibold text-zinc-50">
                      {project.name}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[11px] text-zinc-300">
                    {project.description}
                  </p>
                </div>
                <span className="whitespace-nowrap text-[11px] font-semibold text-sky-200">
                  ${project.price}
                </span>
              </div>
            ))}
            {!loading && !projects.length && (
              <p className="text-xs text-zinc-500">
                No projects found. Create your first project using the form on
                the right.
              </p>
            )}
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-sm font-semibold text-zinc-50">
            Create new project
          </h2>
          <form className="space-y-3 text-xs" onSubmit={handleCreate}>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1">
                <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                  Name
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                  placeholder="Project name"
                />
              </label>
              <label className="space-y-1">
                <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                  Type
                </span>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      type: e.target.value as ProjectType,
                    }))
                  }
                  className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-xs text-zinc-100 outline-none"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="space-y-1 block">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Description
              </span>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder="Short description of what this project does"
              />
            </label>

            <label className="space-y-1 block">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Source / repo
              </span>
              <input
                required
                value={form.source}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, source: e.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder="e.g. private Git repo URL or note"
              />
            </label>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="space-y-1">
                <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                  Price (USD)
                </span>
                <input
                  required
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.price}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                  placeholder="19"
                />
              </label>
              <label className="space-y-1">
                <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                  Image URL
                </span>
                <input
                  value={form.image}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                  placeholder="Optional"
                />
              </label>
              <label className="space-y-1">
                <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                  Video URL
                </span>
                <input
                  value={form.video}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, video: e.target.value }))
                  }
                  className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                  placeholder="Optional"
                />
              </label>
            </div>

            <p className="text-[11px] text-zinc-400">
              At least one of <span className="font-semibold">image</span> or{" "}
              <span className="font-semibold">video</span> is required.
            </p>

            {saveError && (
              <p className="text-[11px] text-red-300">{saveError}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Create project"}
            </button>
          </form>
        </Card>
      </section>
  );
}

