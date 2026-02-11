import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  return (
    <div className="space-y-6">
      <Badge>Hand-crafted games, scripts, bots, and websites.</Badge>
      <div className="space-y-4">
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          A curated collection of production-ready projects you can use, learn
          from, or resell.
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-zinc-200">
          This homepage is your hub for all my digital products — from complete
          games and automation scripts to powerful bots and polished website
          templates. Browse by category, search by name or description, and pick
          the project that fits your next idea.
        </p>
      </div>
    </div>
  );
}
