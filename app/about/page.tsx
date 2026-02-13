import { PageContainer } from "@/components/ui/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ABOUT_INTRO, PRIME_NEXUS, PRODUCT_TYPES } from "@/constants/about";

export default function AboutPage() {
  return (
    <PageContainer className="gap-12 pt-16">
      <section className="space-y-4">
        <Badge>{ABOUT_INTRO.badge}</Badge>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {ABOUT_INTRO.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-200">
          {ABOUT_INTRO.description}
        </p>
      </section>

      {/* Prime Nexus – Team Introduction */}
      <section className="space-y-8">
        <div className="space-y-4">
          <Badge>Prime Nexus</Badge>
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
            Team Introduction
          </h2>
        </div>

        <div className="space-y-6 text-base leading-relaxed text-zinc-200">
          <p>{PRIME_NEXUS.intro.lead}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="space-y-2 border-sky-500/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400">
                Prime
              </h3>
              <p>{PRIME_NEXUS.intro.nameMeaning.prime}</p>
            </Card>
            <Card className="space-y-2 border-sky-500/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400">
                Nexus
              </h3>
              <p>{PRIME_NEXUS.intro.nameMeaning.nexus}</p>
            </Card>
          </div>

          <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 px-4 py-3 text-center">
            <p className="font-semibold text-sky-300">
              {PRIME_NEXUS.intro.battleCry}
            </p>
          </div>

          <p className="font-medium text-zinc-100">
            {PRIME_NEXUS.intro.tagline}
          </p>
        </div>

        {/* Who We Are */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white md:text-2xl">Who We Are</h3>
          <div className="space-y-4 text-base leading-relaxed text-zinc-200">
            <p>
              <span className="font-medium text-zinc-100">
                Size & Structure:
              </span>{" "}
              {PRIME_NEXUS.whoWeAre.sizeAndStructure}
            </p>
            <p>
              <span className="font-medium text-zinc-100">
                Diversity & Talent:
              </span>{" "}
              {PRIME_NEXUS.whoWeAre.diversityAndTalent}
            </p>
            <div>
              <p className="mb-3 font-medium text-zinc-100">
                Stack & Expertise (2026 edition):
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    ["Languages", PRIME_NEXUS.whoWeAre.stackAndExpertise.languages],
                    ["Backend", PRIME_NEXUS.whoWeAre.stackAndExpertise.backend],
                    ["Frontend", PRIME_NEXUS.whoWeAre.stackAndExpertise.frontend],
                    ["AI/ML", PRIME_NEXUS.whoWeAre.stackAndExpertise.aiMl],
                    ["Infra/Cloud", PRIME_NEXUS.whoWeAre.stackAndExpertise.infraCloud],
                    ["Security", PRIME_NEXUS.whoWeAre.stackAndExpertise.security],
                  ] as const
                ).map(([label, text]) => (
                  <Card key={label} className="space-y-1">
                    <h4 className="text-sm font-semibold text-sky-200">
                      {label}
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-300">
                      {text}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Philosophy */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white md:text-2xl">Our Philosophy</h3>
          <p className="text-base leading-relaxed text-zinc-200">
            {PRIME_NEXUS.philosophy}
          </p>
        </div>

        {/* Culture & Vibe */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white md:text-2xl">Culture & Vibe</h3>
          <p className="text-base leading-relaxed text-zinc-200">
            {PRIME_NEXUS.cultureAndVibe}
          </p>
        </div>

        {/* What We're Building */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white md:text-2xl">
            What We&apos;re Building
          </h3>
          <p className="text-base leading-relaxed text-zinc-200">
            {PRIME_NEXUS.whatWereBuilding}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white md:text-2xl">Product Types</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {PRODUCT_TYPES.map(({ title, description }) => (
            <Card key={title} className="space-y-3">
              <h3 className="text-base font-semibold text-sky-200">{title}</h3>
              <p className="text-base leading-relaxed text-zinc-200">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
