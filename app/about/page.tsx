export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 pb-20 pt-16 text-zinc-50 md:px-10 lg:px-16">
      <section className="space-y-4">
        <p className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-100 ring-1 ring-sky-500/40">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
          Learn more about the products I sell.
        </p>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          About the projects in this marketplace
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-200">
          This marketplace is focused on practical, ready-to-use digital
          products. Every project is built from real-world experience and is
          designed to solve a specific problem: engaging players, automating
          workflows, powering communities, or launching polished websites.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/60 p-4">
          <h2 className="text-sm font-semibold text-sky-200">Games</h2>
          <p className="text-sm leading-relaxed text-zinc-200">
            Games are created with performance and replayability in mind. They
            are structured so you can explore clean gameplay loops, reusable
            components, and patterns you can extend into your own titles.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/60 p-4">
          <h2 className="text-sm font-semibold text-sky-200">Scripts</h2>
          <p className="text-sm leading-relaxed text-zinc-200">
            Scripts help you automate repetitive tasks and speed up your
            development process. They are designed to be configurable, well
            commented, and easy to adapt to your own workflows.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/60 p-4">
          <h2 className="text-sm font-semibold text-sky-200">Bots</h2>
          <p className="text-sm leading-relaxed text-zinc-200">
            Bots bring intelligence and automation to platforms like Discord or
            Telegram. They focus on common tasks such as moderation, ticketing,
            and custom commands, and are built with clear separation between
            configuration and logic.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/60 p-4">
          <h2 className="text-sm font-semibold text-sky-200">Websites</h2>
          <p className="text-sm leading-relaxed text-zinc-200">
            Websites are designed with clean layouts, responsive design, and
            modern tooling so you can launch quickly. They are great starting
            points for portfolios, landing pages, and full-featured web
            applications.
          </p>
        </div>
      </section>
    </main>
  );
}

