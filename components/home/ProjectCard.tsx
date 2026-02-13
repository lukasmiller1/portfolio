import type { Project } from "@/types/project";

function getMediaLabel(project: Project): string {
  if (project.image && project.video) return "Includes image preview & video demo.";
  if (project.video) return "Includes video demo.";
  if (project.image) return "Includes image preview.";
  return "No media attached (update in dashboard).";
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4 shadow-md shadow-black/60 transition hover:border-sky-400/60 hover:shadow-sky-500/30"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-zinc-50">{project.name}</h3>
          <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-sky-200">
            ${project.price}
          </span>
        </div>
        <p className="line-clamp-3 text-sm text-zinc-300">
          {project.description}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
        <p className="flex-1 pr-2">{getMediaLabel(project)}</p>
        <button
          type="button"
          className="rounded-full bg-sky-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black transition group-hover:bg-sky-400"
        >
          View details
        </button>
      </div>
    </article>
  );
}
