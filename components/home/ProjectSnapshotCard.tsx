export function ProjectSnapshotCard() {
  return (
    <div className="flex min-h-[200px] items-center justify-center p-4 sm:min-h-[260px] sm:p-6 md:min-h-[280px] md:p-8">
      <div className="relative w-full max-w-[140px] min-w-0 sm:max-w-[200px] md:max-w-[240px]">
        <img
          src="/logo.jpg"
          alt="Team logo"
          className="aspect-square w-full rounded-full border-0 object-contain outline-none"
        />
      </div>
    </div>
  );
}
