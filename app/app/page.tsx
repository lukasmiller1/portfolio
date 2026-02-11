export default function AppDashboard() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center text-zinc-50">
      <div className="rounded-3xl border border-white/10 bg-black/60 px-8 py-10 shadow-xl shadow-black/70">
        <h1 className="text-2xl font-semibold tracking-tight">
          App dashboard coming soon
        </h1>
        <p className="mt-3 text-sm text-zinc-300">
          This page will become the management area where you can add, edit,
          and remove your projects from the{" "}
          <span className="font-semibold">Project</span> collection in your
          offline MongoDB database.
        </p>
        <p className="mt-4 text-xs text-zinc-400">
          For now, you can populate the <code>Project</code> collection
          directly in MongoDB and they will appear on the homepage.
        </p>
      </div>
    </main>
  );
}

