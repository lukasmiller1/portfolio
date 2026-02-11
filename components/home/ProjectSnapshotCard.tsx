const SNAPSHOT_ITEMS = [
  { term: "Included with Pro", value: "1 project of choice" },
  { term: "Code access", value: "Full source" },
  { term: "Project types", value: "Games, scripts, bots, sites" },
  { term: "Lifetime access", value: "Yes" },
] as const;

export function ProjectSnapshotCard() {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-black/60 p-5 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
      <h2 className="text-sm font-semibold text-zinc-100">Project snapshot</h2>
      <p className="text-xs text-zinc-300">
        Every purchase includes full source code, documentation, and basic
        support to help you get started quickly.
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-200">
        {SNAPSHOT_ITEMS.map(({ term, value }) => (
          <div key={term}>
            <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
              {term}
            </dt>
            <dd className="mt-1 font-semibold text-sky-200">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
