import { PageContainer } from "@/components/ui/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const TEAM_MEMBERS = [
  {
    name: "Your Name",
    role: "Founder & Developer",
    description:
      "Describe your main responsibilities, favorite technologies, and what you focus on when building projects.",
  },
] as const;

export default function TeamPage() {
  return (
    <PageContainer className="gap-10 pt-16">
      <section className="space-y-4">
        <Badge>Meet the team behind these projects.</Badge>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Team
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-200">
          Introduce the people (or yourself) working on these games, scripts,
          bots, and websites. Share what each person brings to the projects and
          how you collaborate.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TEAM_MEMBERS.map((member) => (
          <Card key={member.name} className="space-y-2">
            <h2 className="text-sm font-semibold text-sky-200">
              {member.name}
            </h2>
            <p className="text-xs font-medium text-zinc-400">{member.role}</p>
            <p className="text-sm text-zinc-200">{member.description}</p>
          </Card>
        ))}
      </section>
    </PageContainer>
  );
}

