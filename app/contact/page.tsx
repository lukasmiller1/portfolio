export default function ContactPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 pb-20 pt-16 text-zinc-50 md:px-10 lg:px-16">
      <section className="space-y-4">
        <p className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-100 ring-1 ring-sky-500/40">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
          Get in touch about projects or custom work.
        </p>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Contact &amp; about me
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-200">
          Use the details below to reach out with questions, custom requests,
          or feedback about any of the projects in this marketplace.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/60 p-4">
          <h2 className="text-sm font-semibold text-sky-200">Contact</h2>
          <p className="text-sm text-zinc-200">
            If you are interested in a custom project, want adjustments to an
            existing product, or have pre-sale questions, feel free to reach
            out directly.
          </p>
          <dl className="space-y-2 text-sm text-zinc-200">
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                Email
              </dt>
              <dd className="font-medium">
                your-email@example.com
                <span className="ml-1 text-[11px] text-zinc-500">
                  (replace with your real address)
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                Discord / Telegram
              </dt>
              <dd className="font-medium">
                @your-handle
                <span className="ml-1 text-[11px] text-zinc-500">
                  (update with your handle)
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/60 p-4">
          <h2 className="text-sm font-semibold text-sky-200">About me</h2>
          <p className="text-sm text-zinc-200">
            Add a short introduction about yourself here: your background, tech
            stack, and what kind of projects you enjoy building. This helps
            buyers understand who they are buying from and what to expect in
            terms of code quality and support.
          </p>
          <p className="text-sm text-zinc-200">
            You can also describe how updates are delivered, whether buyers get
            future improvements, and how to contact you for bug reports or
            feature requests.
          </p>
        </div>
      </section>
    </main>
  );
}

