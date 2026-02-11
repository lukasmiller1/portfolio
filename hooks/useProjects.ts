"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectType } from "@/types/project";
import { DEMO_PROJECTS } from "@/constants/projects";

const API_PROJECTS = "/api/projects";

export function useProjects(searchQuery: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }
        const res = await fetch(`${API_PROJECTS}?${params.toString()}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load projects");
        const data = (await res.json()) as { projects: Project[] };
        if (!cancelled) {
          setProjects(data.projects);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError(
            "Unable to load projects right now. You can still browse the demo list below."
          );
          setProjects(DEMO_PROJECTS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProjects();
    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  const groupedByType = useMemo(() => {
    const groups: Record<ProjectType, Project[]> = {
      game: [],
      script: [],
      bot: [],
      website: [],
      other: [],
    };
    for (const project of projects) {
      const type = (project.type ?? "other") as ProjectType;
      groups[type].push(project);
    }
    return groups;
  }, [projects]);

  return { projects, loading, error, groupedByType };
}
