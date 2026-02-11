import { PageContainer } from "@/components/ui/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  CONTACT_INTRO,
  CONTACT_INFO,
  ABOUT_ME,
} from "@/constants/contact";

export default function ContactPage() {
  return (
    <PageContainer className="gap-10 pt-16">
      <section className="space-y-4">
        <Badge>{CONTACT_INTRO.badge}</Badge>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {CONTACT_INTRO.title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-200">
          {CONTACT_INTRO.description}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-sky-200">Contact</h2>
          <p className="text-sm text-zinc-200">{CONTACT_INFO.blurb}</p>
          <dl className="space-y-2 text-sm text-zinc-200">
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                Email
              </dt>
              <dd className="font-medium">
                {CONTACT_INFO.email}{" "}
                <span className="ml-1 text-[11px] text-zinc-500">
                  {CONTACT_INFO.emailNote}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                {CONTACT_INFO.discordLabel}
              </dt>
              <dd className="font-medium">
                {CONTACT_INFO.handle}{" "}
                <span className="ml-1 text-[11px] text-zinc-500">
                  {CONTACT_INFO.handleNote}
                </span>
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-sky-200">
            {ABOUT_ME.title}
          </h2>
          {ABOUT_ME.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-sm text-zinc-200">
              {paragraph}
            </p>
          ))}
        </Card>
      </section>
    </PageContainer>
  );
}
