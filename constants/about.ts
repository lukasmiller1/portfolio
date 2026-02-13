export const ABOUT_INTRO = {
  badge: "Learn more about the products we're developing.",
  title: "About the projects and our team in this website",
  description:
    "This website is focused on practical, ready-to-use digital products. Every project is built from real-world experience and is designed to solve a specific problem: engaging players, automating workflows, powering communities, or launching polished websites.",
} as const;

export const PRIME_NEXUS = {
  intro: {
    lead:
      "Prime Nexus is the elite engineering core based right here in Germany's buzzing tech ecosystem. We are a tight-knit, high-caliber developer team forged to tackle the hardest problems in modern software: mission-critical systems, seamless distributed architectures, AI-native applications, cloud-scale infrastructure, and bold innovations that actually move the needle.",
    nameMeaning: {
      prime:
        "We operate at the highest standard. First-class code, ruthless optimization, zero-compromise quality.",
      nexus:
        "We're the central hub where ideas, technologies, and people converge to create something greater than the sum of parts.",
    },
    battleCry: "Forward. Fearless. Unstoppable.",
    tagline:
      "Prime Nexus isn't just a team it's the convergence point where elite talent turns ambitious visions into unbreakable reality.",
  },
  whoWeAre: {
    sizeAndStructure:
      "12 core members (growing strategically). Cross-functional squad with backend wizards, frontend architects, DevOps ninjas, ML engineers, security paranoids, and one or two full-stack unicorns who just get shit done.",
    diversityAndTalent:
      "Global minds rooted in Germany. Multiple PhDs, ex-FAANG/WebScale/Scale AI/wealthtech veterans, startup founders who sold or pivoted hard. Average experience: 9+ years shipping production-grade code.",
    stackAndExpertise: {
      languages:
        "TypeScript/Node.js, C++, C#, Java, Rust, Go, Python (heavy on fast), occasional Elixir for real-time.",
      backend:
        "Node.js, gRPC + GraphQL, event-driven (Kafka/NATS), serverless + containers (Kubernetes + Fly.io/ECS).",
      frontend:
        "Vue.js, React + Next.js/TanStack ecosystem, solid design system discipline.",
      aiMl:
        "PyTorch, fine-tuning LLMs, RAG pipelines, agentic workflows, inference optimization.",
      infraCloud:
        "AWS (multi-account mastery), Terraform, GitHub Actions/ArgoCD, observability (Grafana + OpenTelemetry).",
      security:
        "Zero-trust by default, secrets rotation, SBOMs, pentest cycles.",
    },
  },
  philosophy:
    "We build for longevity, not hype cycles. Clean, testable, observable code that survives 5–10 year horizons. We ship fast but never break prod. Hotfixes are rare; root-cause post-mortems are mandatory. We pair-program like it's therapy, review code like detectives, and refactor proactively. No sacred cows—legacy dies when it deserves to.",
  cultureAndVibe:
    "Toronto energy: Work hard, skate hard, eat poutine at 2 AM after a deploy. Remote-first but heavy in-person hangs at co-working spots in King West or Liberty Village. Weekly \"Tech Deep Dive\" sessions (last one: optimizing LLM inference on consumer GPUs). Monthly hack days with zero Jira pressure. We roast bad PRs mercilessly but constructively. Beers, board games, and occasional escape rooms to keep the humans human.",
  whatWereBuilding:
    "Confidential for now, but think: next-gen platforms blending real-time collaboration, AI augmentation, and unbreakable scalability—aimed at industries that can't afford downtime. We're not chasing unicorns; we're engineering the plumbing that enables them.",
} as const;

export const PRODUCT_TYPES = [
  {
    title: "Games",
    description:
      "Games are created with performance and replayability in mind. They are structured so you can explore clean gameplay loops, reusable components, and patterns you can extend into your own titles.",
  },
  {
    title: "Scripts",
    description:
      "Scripts help you automate repetitive tasks and speed up your development process. They are designed to be configurable, well commented, and easy to adapt to your own workflows.",
  },
  {
    title: "Bots",
    description:
      "Bots bring intelligence and automation to platforms like Discord or Telegram. They focus on common tasks such as moderation, ticketing, and custom commands, and are built with clear separation between configuration and logic.",
  },
  {
    title: "AI",
    description:
      "AI projects leverage machine learning and intelligent automation to solve complex problems. They are designed to be adaptable, well-documented, and ready to integrate into your workflows.",
  },
  {
    title: "Websites",
    description:
      "Websites are designed with clean layouts, responsive design, and modern tooling so you can launch quickly. They are great starting points for portfolios, landing pages, and full-featured web applications.",
  },
] as const;
