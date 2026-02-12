"use client";

import type { ProjectType } from "@/types/project";
import { PROJECT_TYPE_LABELS, PROJECT_TYPES_ORDER } from "@/constants/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectSearch } from "./ProjectSearch";
import type { Project } from "@/types/project";

interface ProjectsByCategoryProps {
  groupedByType: Record<ProjectType, Project[]>;
  loading: boolean;
  error: string | null;
  totalCount: number;
  selectedCategory?: "all" | ProjectType;
  onCategoryChange?: (category: "all" | ProjectType) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function ProjectsByCategory({
  groupedByType,
  loading,
  error,
  totalCount,
  selectedCategory = "all",
  onCategoryChange,
  searchValue = "",
  onSearchChange,
}: ProjectsByCategoryProps) {
  const typesToShow =
    selectedCategory === "all"
      ? PROJECT_TYPES_ORDER
      : [selectedCategory];

  return (
    <section id="projects" className="space-y-8">
      <div className="space-y-3">
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

        {onSearchChange && (
          <ProjectSearch value={searchValue} onChange={onSearchChange} />
        )}

        <nav
          aria-label="Browse by category"
          className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2"
        >
        <button
          type="button"
          onClick={() => onCategoryChange?.("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
            selectedCategory === "all"
              ? "bg-sky-500/30 text-sky-100 ring-1 ring-sky-400/50"
              : "text-zinc-300 hover:bg-white/10 hover:text-zinc-50"
          }`}
        >
          All
        </button>
        {PROJECT_TYPES_ORDER.map((type) => {
          const items = groupedByType[type];
          const label = PROJECT_TYPE_LABELS[type];
          return (
            <button
              key={type}
              type="button"
              onClick={() => onCategoryChange?.(type)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                selectedCategory === type
                  ? "bg-sky-500/30 text-sky-100 ring-1 ring-sky-400/50"
                  : "text-zinc-300 hover:bg-white/10 hover:text-zinc-50"
              }`}
            >
              {label} {items.length > 0 && `(${items.length})`}
            </button>
          );
        })}
        </nav>
      </div>

      {error && (
        <p className="rounded-2xl border border-sky-500/40 bg-sky-500/10 px-4 py-3 text-xs text-sky-100">
          {error}
        </p>
      )}

      <div className="space-y-10">
        {typesToShow.map((type) => {
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
