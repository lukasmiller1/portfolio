import type { TeamMember } from "@/types/team";

export const DEMO_TEAM_MEMBERS: TeamMember[] = [
  {
    _id: "team-lukas-muller",
    name: "Dr. Lukas Müller",
    role: "Senior AI Engineer",
    introduction:
      "Lukas Müller is our leading AI architect, holding a PhD in Machine Learning from TU Munich. With over 14 years in the field, he has pioneered scalable deep learning systems at major German tech firms and research institutes like Fraunhofer and DFKI. Lukas specializes in transformer-based models, efficient inference optimization (quantization, pruning, ONNX/TensorRT), RAG pipelines, and multimodal AI agents. He led the development of production-grade LLM fine-tuning frameworks that reduced inference costs by 60% while maintaining SOTA accuracy. Fluent in PyTorch, JAX, and Hugging Face ecosystems, he emphasizes ethical AI, data privacy (DSGVO/GDPR-compliant), and reproducible research. Lukas is known for his rigorous, methodical approach—always backing innovations with solid benchmarks and ablation studies. Outside code, he enjoys alpine hiking and brewing precision-perfect craft beer. In Prime Nexus, Lukas drives our AI-native features, ensuring every model we deploy is robust, explainable, and future-proof.",
    photo: null,
  },
  {
    _id: "team-benjamin-wolf",
    name: "Benjamin Wolf",
    role: "Senior Blockchain Engineer",
    introduction:
      "Benjamin Wolf brings 12 years of blockchain expertise, with a Master's in Distributed Systems from RWTH Aachen. She has deep experience in Ethereum, Polkadot, Cosmos, and layer-2 scaling solutions, having contributed to enterprise-grade smart contract platforms at leading German fintechs and automotive consortia. Benjamin excels in Solidity, Rust (for Substrate/ink!), secure contract auditing (Slither, MythX), zero-knowledge proofs (zk-SNARKs/Groth16), and cross-chain interoperability (IBC, bridges). She architected tamper-proof supply-chain tracking systems and DeFi protocols with sub-second finality and gas-optimized execution. Security-first mindset: she conducts regular formal verification and has prevented multimillion-euro exploits through proactive threat modeling. Benjamin is a frequent speaker at events like Devcon and ETHBerlin, advocating for sustainable, regulatory-compliant blockchain (MiCA-ready). Precise, calm under pressure, and a master of gas golfing. In our team, she builds the unbreakable decentralized backbone that powers secure, transparent integrations.",
    photo: null,
  },
  {
    _id: "team-maximilian-weber",
    name: "Maximilian Weber",
    role: "Senior Full Stack Engineer",
    introduction:
      "Maximilian Weber is the versatile full-stack cornerstone with 13 years shipping end-to-end web platforms. Educated at KIT Karlsruhe, he masters TypeScript/Node.js, Go for high-performance backends, React/Next.js (App Router, Server Components), GraphQL (Apollo Federation), and microservices orchestration (gRPC, Kafka). Max has led migrations from monoliths to domain-driven, event-sourced architectures at scale, achieving 99.99% uptime in fintech and SaaS environments. He obsesses over clean code (DDD, hexagonal architecture), test coverage (Jest, Vitest, Cypress), CI/CD pipelines (GitHub Actions, ArgoCD), and DX tools like Turborepo and Nx. Performance tuning is second nature—Core Web Vitals always green. Max also handles cloud-native infra (AWS EKS, Terraform) and security hardening (OWASP top 10, zero-trust). Collaborative and direct, he elevates every PR through thorough reviews. Passionate about open-source contributions and weekend cycling tours in the Black Forest. At Prime Nexus, Maximilian ensures seamless front-to-back cohesion.",
    photo: null,
  },
  {
    _id: "team-sophie-fischer",
    name: "Sophie Fischer",
    role: "Senior Mobile Engineer",
    introduction:
      "Sophie Fischer, with 11 years in native and cross-platform mobile development, is our cross-device maestro. She graduated from TU Berlin and has shipped award-winning iOS/Android apps for German scale-ups in mobility, healthtech, and e-commerce. Expert in SwiftUI, UIKit, Jetpack Compose, Kotlin Multiplatform Mobile (KMM), and React Native (when performance allows). Sophie masters offline-first architectures (Room/SQLDelight + Redux-like state), push notifications (Firebase/APNs), secure auth (OAuth2, Biometrics), and App Store/Play Store compliance. She reduced crash rates to <0.1% and boosted retention through thoughtful UX and performance profiling (Instruments, Android Profiler). Strong advocate for accessibility (VoiceOver/TalkBack) and internationalization. Sophie leads our mobile strategy, from concept to App Store optimization. Outside work, she's an avid photographer and Bauhaus design enthusiast. Her meticulous eye for detail makes every Prime Nexus mobile experience polished and intuitive.",
    photo: null,
  },
  {
    _id: "team-thomas-schneider",
    name: "Thomas Schneider",
    role: "Senior Full Stack Developer",
    introduction:
      "Thomas Schneider rounds out the core with 15 years of battle-tested full-stack mastery. From FH Aachen roots, he has built everything from enterprise ERPs to real-time collaboration platforms. Thomas is polyglot: TypeScript/JavaScript (modern ES202x), Python (FastAPI/Django), Rust for performance-critical components, and legacy Java/C# when required. He architects scalable APIs (REST + GraphQL), real-time features (WebSockets, Socket.IO, Phoenix Channels), and cloud deployments (Docker, Kubernetes, Helm). Thomas excels at refactoring legacy codebases without downtime, implementing observability (Prometheus, ELK, Sentry), and driving technical debt reduction sprints. Security-conscious (JWT, RBAC, encryption at rest/transit) and performance-obsessed (lazy loading, code-splitting, caching strategies). He mentors juniors with patience and brutal honesty. A Berliner at heart, Thomas loves techno clubs and street food crawls. In Prime Nexus, he glues our stack together with rock-solid, maintainable code that scales effortlessly.",
    photo: null,
  },
];
