const CATEGORIES = [
  // {
  //   title: "Games",
  //   description:
  //     "Ready-to-play titles with clean source code for learning or customization.",
  // },
  // {
  //   title: "Scripts & Bots",
  //   description:
  //     "Automate tasks, manage communities, and integrate services with production bots.",
  // },
  // {
  //   title: "AI",
  //   description:
  //     "Intelligent automation and ML-powered tools ready to integrate into your workflows.",
  // },
  // {
  //   title: "Websites",
  //   description:
  //     "Fast, responsive sites and components ready to plug into your stack.",
  // },
] as const;

export function CategoryCards() {
  return (
    <div className="grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
      {CATEGORIES.map(({ title, description }) => (
        <div
          key={title}
          className="rounded-2xl border border-white/10 bg-black/50 p-3"
        >
          <p className="font-semibold text-sky-200">{title}</p>
          <p className="mt-1 text-sm text-zinc-300">{description}</p>
        </div>
      ))}
    </div>
  );
}
