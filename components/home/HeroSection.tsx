import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  return (
    <div className="space-y-6">
      <Badge>Hand-crafted games, scripts, bots, AI, and websites.</Badge>
      <div className="space-y-4">
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          We have carefully selected completed projects that you can use right away.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-zinc-200">
          This website is your one-stop shop for all the digital products our 
          team has created. From high-quality games and automation scripts to 
          powerful bots and stylish website templates, we offer a wide range 
          of products. Browse by category or search by name or description to 
          find the perfect product for your next project.
        </p>
      </div>
    </div>
  );
}
