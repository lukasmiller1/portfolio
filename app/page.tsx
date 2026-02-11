"use client";

import { useEffect, useMemo, useState } from "react";

type ProjectType = "game" | "script" | "bot" | "website" | "other";

export type Project = {
  _id: string;
  name: string;
  description: string;
  source: string;
  price: number;
  image?: string | null;
  video?: string | null;
  type: ProjectType;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = new URLSearchParams();
        if (search.trim()) {
          params.set("search", search.trim());
        }

        const res = await fetch(`/api/projects?${params.toString()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load projects");
        }

        const data = (await res.json()) as { projects: Project[] };
        setProjects(data.projects);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load projects right now. You can still browse the demo list below."
        );
        // Fallback demo data to keep the page useful without a database
        setProjects([
          {
            _id: "demo-1",
            name: "Galaxy Runner",
            description:
              "An arcade-style endless runner game with a sci-fi twist.",
            source: "Private repository (available after purchase).",
            price: 19,
            image: "/file.svg",
            video: null,
            type: "game",
          },
          {
            _id: "demo-2",
            name: "AutoBackup Script",
            description:
              "A Node.js script that automatically backs up your projects to local or cloud storage.",
            source: "Private repository (available after purchase).",
            price: 9,
            image: null,
            video: "/window.svg",
            type: "script",
          },
          {
            _id: "demo-3",
            name: "Discord Support Bot",
            description:
              "Configurable bot for handling FAQs, tickets, and role assignments in your server.",
            source: "Private repository (available after purchase).",
            price: 24,
            image: "/globe.svg",
            video: null,
            type: "bot",
          },
          {
            _id: "demo-4",
            name: "Portfolio Landing Page",
            description:
              "Responsive, fast-loading landing page template for developers and creators.",
            source: "Private repository (available after purchase).",
            price: 29,
            image: "/window.svg",
            video: null,
            type: "website",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [search]);

  const groupedProjects = useMemo(() => {
    const groups: Record<ProjectType, Project[]> = {
      game: [],
      script: [],
      bot: [],
      website: [],
      other: [],
    };

    for (const project of projects) {
      const t = (project.type || "other") as ProjectType;
      groups[t].push(project);
    }

    return groups;
  }, [projects]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 pb-20 pt-8 text-zinc-50 md:px-10 lg:px-16">
      <section
        id="home"
        className="mt-8 grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
      >
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-100 ring-1 ring-sky-500/40">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            Hand-crafted games, scripts, bots, and websites.
          </p>

          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              A curated collection of production-ready projects you can use,
              learn from, or resell.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-200">
              This homepage is your hub for all my digital products &mdash;
              from complete games and automation scripts to powerful bots and
              polished website templates. Browse by category, search by name or
              description, and pick the project that fits your next idea.
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
              Search projects
              <div className="mt-1 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-zinc-200">
                <span className="text-zinc-500">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by project name or description..."
                  className="w-full bg-transparent text-xs outline-none placeholder:text-zinc-500"
                />
              </div>
            </label>
            <p className="text-[11px] text-zinc-400">
              <span className="font-semibold text-sky-200">
                Get one project with Pro.
              </span>{" "}
              Upgrade once and unlock a project of your choice.
            </p>
          </div>

          <div className="grid gap-3 text-xs text-zinc-300 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <p className="font-semibold text-sky-200">Games</p>
              <p className="mt-1 text-[11px] text-zinc-300">
                Ready-to-play titles with clean source code for learning or
                customization.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <p className="font-semibold text-sky-200">Scripts &amp; Bots</p>
              <p className="mt-1 text-[11px] text-zinc-300">
                Automate tasks, manage communities, and integrate services with
                production bots.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <p className="font-semibold text-sky-200">Websites</p>
              <p className="mt-1 text-[11px] text-zinc-300">
                Fast, responsive sites and components ready to plug into your
                stack.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/60 p-5 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
          <h2 className="text-sm font-semibold text-zinc-100">
            Project snapshot
          </h2>
          <p className="text-xs text-zinc-300">
            Every purchase includes full source code, documentation, and basic
            support to help you get started quickly.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-200">
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                Included with Pro
              </dt>
              <dd className="mt-1 font-semibold text-sky-200">
                1 project of choice
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                Code access
              </dt>
              <dd className="mt-1 font-semibold">Full source</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                Project types
              </dt>
              <dd className="mt-1 font-semibold">Games, scripts, bots, sites</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                Lifetime access
              </dt>
              <dd className="mt-1 font-semibold">Yes</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="projects" className="space-y-8">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-50">
              Projects by category
            </h2>
            <p className="text-sm text-zinc-300">
              Filtered automatically by your search &mdash; matching project
              names and descriptions.
            </p>
          </div>
          {loading ? (
            <p className="text-xs text-zinc-400">Loading projects...</p>
          ) : (
            <p className="text-xs text-zinc-400">
              Showing{" "}
              <span className="font-semibold text-sky-200">
                {projects.length}
              </span>{" "}
              project{projects.length === 1 ? "" : "s"}.
            </p>
          )}
        </header>

        {error && (
          <p className="rounded-2xl border border-sky-500/40 bg-sky-500/10 px-4 py-3 text-xs text-sky-100">
            {error}
          </p>
        )}

        <div className="space-y-10">
          {(
            [
              ["game", "Games"],
              ["script", "Scripts"],
              ["bot", "Bots"],
              ["website", "Websites"],
              ["other", "Other"],
            ] as [ProjectType, string][]
          ).map(([type, label]) => {
            const items = groupedProjects[type];
            if (!items.length) return null;

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
                    <article
                      key={project._id}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4 shadow-md shadow-black/60 transition hover:border-sky-400/60 hover:shadow-sky-500/30"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-zinc-50">
                            {project.name}
                          </h4>
                          <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sky-200">
                            ${project.price}
                          </span>
                        </div>
                        <p className="line-clamp-3 text-xs text-zinc-300">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
                        <p className="flex-1 pr-2">
                          {project.image && project.video
                            ? "Includes image preview & video demo."
                            : project.video
                            ? "Includes video demo."
                            : project.image
                            ? "Includes image preview."
                            : "No media attached (update in dashboard)."}
                        </p>
                        <button className="rounded-full bg-sky-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black transition group-hover:bg-sky-400">
                          View details
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
