"use client";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectSearch({ value, onChange }: ProjectSearchProps) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium uppercase tracking-wide text-zinc-400">
        Search projects
        <div className="mt-1 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-zinc-200">
          <span className="text-zinc-500" aria-hidden>
            🔍
          </span>
          <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by project name or description..."
            className="w-full bg-transparent text-xs outline-none placeholder:text-zinc-500"
            aria-label="Search projects by name or description"
          />
        </div>
      </label>
    </div>
  );
}
