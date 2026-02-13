"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectType } from "@/types/project";
import { DEMO_PROJECTS } from "@/constants/projects";

export function useProjects(searchQuery: string) {
  const [projects] = useState<Project[]>(DEMO_PROJECTS);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [projects, searchQuery]);

  const groupedByType = useMemo(() => {
    const groups: Record<ProjectType, Project[]> = {
      game: [],
      script: [],
      bot: [],
      ai: [],
      website: [],
      other: [],
    };
    for (const project of filtered) {
      const type = (project.type ?? "other") as ProjectType;
      groups[type].push(project);
    }
    return groups;
  }, [filtered]);

  return {
    projects: filtered,
    loading: false,
    error: null,
    groupedByType,
  };
}
