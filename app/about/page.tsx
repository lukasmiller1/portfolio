import { PageContainer } from "@/components/ui/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ABOUT_INTRO, PRODUCT_TYPES } from "@/constants/about";

export default function AboutPage() {
  return (
    <PageContainer className="gap-10 pt-16">
      <section className="space-y-4">
        <Badge>{ABOUT_INTRO.badge}</Badge>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {ABOUT_INTRO.title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-200">
          {ABOUT_INTRO.description}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {PRODUCT_TYPES.map(({ title, description }) => (
          <Card key={title} className="space-y-3">
            <h2 className="text-sm font-semibold text-sky-200">{title}</h2>
            <p className="text-sm leading-relaxed text-zinc-200">{description}</p>
          </Card>
        ))}
      </section>
    </PageContainer>
  );
}
