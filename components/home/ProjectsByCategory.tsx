"use client";

import type { ProjectType } from "@/types/project";
import { PROJECT_TYPE_LABELS, PROJECT_TYPES_ORDER } from "@/constants/projects";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/project";

interface ProjectsByCategoryProps {
  groupedByType: Record<ProjectType, Project[]>;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export function ProjectsByCategory({
  groupedByType,
  loading,
  error,
  totalCount,
}: ProjectsByCategoryProps) {
  return (
    <section id="projects" className="space-y-8">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-50">
            Projects by category
          </h2>
          <p className="text-sm text-zinc-300">
            Filtered automatically by your search — matching project names and
            descriptions.
          </p>
        </div>
        {loading ? (
          <p className="text-xs text-zinc-400">Loading projects...</p>
        ) : (
          <p className="text-xs text-zinc-400">
            Showing{" "}
            <span className="font-semibold text-sky-200">{totalCount}</span>{" "}
            project{totalCount === 1 ? "" : "s"}.
          </p>
        )}
      </header>

      {error && (
        <p className="rounded-2xl border border-sky-500/40 bg-sky-500/10 px-4 py-3 text-xs text-sky-100">
          {error}
        </p>
      )}

      <div className="space-y-10">
        {PROJECT_TYPES_ORDER.map((type) => {
          const items = groupedByType[type];
          if (!items.length) return null;
          const label = PROJECT_TYPE_LABELS[type];
          return (
            <section key={type} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
                  {label}
                </h3>
                <span className="text-[11px] text-zinc-500">
                  {items.length} item{items.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
