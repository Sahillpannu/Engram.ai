export const siteConfig = {
  name: "Engram",
  tagline: "Your AI agent remembers.",
  description:
    "Engram is a persistent memory infrastructure layer for AI agents. It turns emails, meetings, calendars and conversations into long-term memory agents can reason over.",
};

export const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Architecture", href: "#architecture" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  label: "PERSISTENT MEMORY FOR AGENTS",
  headline1: "THE BR(AI)N",
  headline2: "your company always needed",
  subheading:
    "Turn emails, meetings, and calendars into long-term memory your agents can reason over.",
  ctaPrimary: "Connect Workspace",
  ctaSecondary: "View Architecture",
  trustCaption: "WORKS WITH YOUR EXISTING TOOLS",
  trust: ["Gmail", "Calendar", "Slack", "Zoom", "Fireflies", "Notion"],
};

export const problem = {
  eyebrow: "01 — THE PROBLEM",
  headline: "Agents forget everything.",
  body: "Every new session starts from zero. The email from last Tuesday, the decision made in Monday’s meeting, the project you’ve tracked for weeks — gone. Your agent is intelligent, but without memory it can’t build on anything. It asks the same questions. It repeats the same work.",
  cards: [
    { tag: "email", text: "Contract draft from Acme" },
    { tag: "meeting", text: "Q3 pricing decision" },
    { tag: "calendar", text: "Demo with Globex" },
    { tag: "slack", text: "Feature request from Sam" },
    { tag: "note", text: "Vendor evaluation notes" },
  ],
  forgetLabel: "FADING FROM CONTEXT",
  restoreLabel: "Engram restores them.",
};

export const howItWorks = {
  eyebrow: "02 — HOW IT WORKS",
  headline: "From signal to memory.",
  subtext:
    "Four stages turn the noise of your workday into memory your agent can actually use.",
  steps: [
    {
      number: "01",
      title: "Connect",
      desc: "Authenticate Gmail, Calendar, Slack and your meeting tools in a single OAuth flow. Engram begins listening immediately — no SDK to install, no infrastructure to deploy.",
    },
    {
      number: "02",
      title: "Ingest",
      desc: "New emails, events and transcripts stream in through webhooks and Pub/Sub, deduplicated and queued for processing in real time.",
    },
    {
      number: "03",
      title: "Structure",
      desc: "An LLM filter discards noise, extracts entities, and writes typed memory records with consistent metadata — the stuff worth remembering, nothing else.",
    },
    {
      number: "04",
      title: "Retrieve",
      desc: "Your agent queries memory through a typed API — semantic search, recall and entity lookup — grounded in context, across every session.",
    },
  ],
};

export const capabilities = {
  eyebrow: "03 — CAPABILITIES",
  headline: "Memory, built for real work.",
  subtext:
    "Not generic vector storage — primitives tuned for the signals agents actually need.",
  items: [
    {
      id: "search",
      span: "lg",
      title: "Semantic Memory Search",
      desc: "Ask in natural language and recall the right memory across every source — ranked by relevance, scoped by entity and time.",
      demo: "search",
      tag: "search",
    },
    {
      id: "meetings",
      span: "md",
      title: "Meeting Intelligence",
      desc: "Transcripts become structured memory — decisions, action items and commitments, ready to recall.",
      demo: "timeline",
      tag: "meetings",
    },
    {
      id: "email",
      span: "md",
      title: "Email Understanding",
      desc: "Threads are parsed into intent, entities and actions, so your agent knows what actually needs a reply.",
      demo: "email",
      tag: "email",
    },
    {
      id: "calendar",
      span: "sm",
      title: "Calendar Context",
      desc: "Past and upcoming events give your agent a sense of time and what matters next.",
      demo: "calendar",
      tag: "calendar",
    },
    {
      id: "retrieval",
      span: "sm",
      title: "Memory Retrieval",
      desc: "Hybrid search combines semantic similarity with metadata filters for precise recall.",
      demo: "graph",
      tag: "retrieval",
    },
    {
      id: "sync",
      span: "md",
      title: "Real-time Sync",
      desc: "Webhooks keep memory live. New signals are processed in seconds, not on a schedule.",
      demo: "sync",
      tag: "sync",
    },
  ],
};

export const architecture = {
  eyebrow: "04 — ARCHITECTURE",
  headline: "Memory, as infrastructure.",
  body: "A pipeline that takes raw signals from your tools, normalizes them, embeds them, and exposes memory through APIs your agents can query. Every stage is observable, typed and stateless.",
  stages: [
    {
      id: "sources",
      label: "sources",
      title: "Sources",
      desc: "Gmail, Calendar, Slack, Zoom, Notion and Fireflies push events the moment they happen.",
      detail:
        "Webhooks and Pub/Sub deliver events in real time — no polling, no cron jobs, no missed updates.",
      items: ["Gmail", "Calendar", "Slack", "Zoom", "Notion", "Fireflies"],
    },
    {
      id: "ingestion",
      label: "ingestion",
      title: "Ingestion",
      desc: "An event queue receives and deduplicates incoming signals.",
      detail:
        "Idempotent consumers guarantee at-least-once delivery without double processing.",
      items: ["Pub/Sub", "Webhooks", "Event Queue"],
    },
    {
      id: "normalization",
      label: "normalization",
      title: "Normalization",
      desc: "Heterogeneous payloads are mapped to a unified memory schema.",
      detail:
        "Emails, events and transcripts become typed memory records with consistent metadata.",
      items: ["Schema", "Entities", "Metadata"],
    },
    {
      id: "embeddings",
      label: "embeddings",
      title: "Embeddings",
      desc: "text-embedding-3-small converts each record into a vector.",
      detail:
        "Batched embedding calls keep latency and cost low as your memory scales.",
      items: ["text-embedding-3-small", "Batched", "Cached"],
    },
    {
      id: "qdrant",
      label: "qdrant",
      title: "Qdrant",
      desc: "Vectors and payloads are indexed for fast similarity search.",
      detail:
        "Filtered search lets agents scope memory by source, date or entity in milliseconds.",
      items: ["Vector Index", "Payload Filter", "Hybrid Search"],
    },
    {
      id: "memory-api",
      label: "memory-api",
      title: "Memory APIs",
      desc: "A typed API exposes search, recall and write operations.",
      detail:
        "Semantic search, time-scoped recall and entity lookup through a single interface.",
      items: ["/search", "/recall", "/write"],
    },
    {
      id: "agents",
      label: "agents",
      title: "AI Agents",
      desc: "Agents retrieve relevant memory via RAG before reasoning or acting.",
      detail:
        "Grounded responses and actions — every reply starts where the last one left off.",
      items: ["RAG", "Tool Calls", "Actions"],
    },
  ],
};

export const integrations = [
  { name: "Gmail", desc: "Inbox, threads & drafts", icon: "Gmail" },
  { name: "Google Calendar", desc: "Events & availability", icon: "GoogleCalendar" },
  { name: "Slack", desc: "Conversations & channels", icon: "Slack" },
  { name: "Zoom", desc: "Meetings & recordings", icon: "Zoom" },
  { name: "Notion", desc: "Docs & notes", icon: "Notion" },
  { name: "Fireflies", desc: "Transcripts & summaries", icon: "Fireflies" },
  { name: "HubSpot", desc: "CRM records & deals", icon: "HubSpot" },
];

export const useCases = {
  eyebrow: "05 — BUILT FOR",
  headline: "Built for agents that need memory.",
  subtext: "One memory layer powers very different agents.",
  items: [
    {
      icon: "Headphones",
      title: "Customer support agent",
      problem: "Repeats clarifying questions on every ticket.",
      memory: "Past tickets, account history, prior resolutions.",
      outcome: "Resolves issues with full context from the first reply.",
    },
    {
      icon: "CalendarClock",
      title: "Executive assistant",
      problem: "Books meetings blind to past commitments.",
      memory: "Calendar, preferences, relationships, notes.",
      outcome: "Schedules and drafts that respect everything before.",
    },
    {
      icon: "TrendingUp",
      title: "Sales copilot",
      problem: "Forgets where each deal stands between calls.",
      memory: "Emails, calls, objections, next steps.",
      outcome: "Every follow-up picks up exactly where the last left off.",
    },
    {
      icon: "Microscope",
      title: "Research agent",
      problem: "Loses findings the moment a session ends.",
      memory: "Sources, summaries, hypotheses, open questions.",
      outcome: "Compounds knowledge across every research session.",
    },
  ],
};

export const pricing = {
  eyebrow: "06 — PRICING",
  headline: "Start free. Scale with your memory.",
  subtext: "Pay for stored memory and retrieval — not seats.",
  tiers: [
    {
      name: "Developer",
      price: "$0",
      cadence: "/mo",
      blurb: "For building and testing your first agent.",
      features: [
        "1 memory namespace",
        "5,000 memories",
        "Gmail & Calendar",
        "Community support",
      ],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Team",
      price: "$49",
      cadence: "/mo",
      blurb: "For production agents your team relies on.",
      features: [
        "10 memory namespaces",
        "250,000 memories",
        "All integrations",
        "Memory APIs",
        "Priority support",
      ],
      cta: "Connect Workspace",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      cadence: "",
      blurb: "For agents at organizational scale.",
      features: [
        "Unlimited namespaces",
        "Unlimited memories",
        "SSO & SAML",
        "Dedicated Qdrant",
        "SLA + audit logs",
      ],
      cta: "Talk to us",
      featured: false,
    },
  ],
};

export const faq = {
  eyebrow: "07 — FAQ",
  headline: "Frequently asked questions",
  items: [
    {
      question: "What is Engram?",
      answer:
        "Engram is a persistent memory infrastructure layer for AI agents. It connects to your Gmail, Calendar and meetings, extracts and embeds valuable knowledge, and gives your agent long-term memory it can reason over across every conversation.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes. Your data stays under your control. Engram processes data on your behalf and stores embeddings in your own Qdrant instance. We do not train on your data, sell it, or share it with third parties.",
    },
    {
      question: "Which providers are supported?",
      answer:
        "Gmail, Google Calendar, Slack, Zoom, Notion, Fireflies and HubSpot today. More integrations are added based on demand — all sources feed the same unified memory schema.",
    },
    {
      question: "Do I need to keep a tab open?",
      answer:
        "No. Engram runs in the background. It listens for new data via Gmail Pub/Sub and Fireflies webhooks, processes it automatically, and updates your memory without you keeping anything open.",
    },
    {
      question: "How is this different from long context or search?",
      answer:
        "Long-context windows eventually fill up, and search requires you to know what to look for. Engram maintains a persistent, searchable memory that grows intelligently over time — your agent remembers across sessions without you re-explaining everything.",
    },
    {
      question: "Can I bring my own vector database?",
      answer:
        "On the Team and Enterprise plans, yes. Point Engram at your own Qdrant cluster and keep memory entirely within your infrastructure.",
    },
  ],
};

export const cta = {
  eyebrow: "GET STARTED",
  headline: "Give your AI a memory.",
  subtext:
    "Connect Workspace in under a minute. No vector database to set up, no infrastructure to manage — sign in and Engram starts learning.",
  ctaPrimary: "Connect Workspace",
  ctaSecondary: "Read Documentation",
  disclaimer:
    "Early access · No credit card required · Privacy-first by design",
};

export const footer = {
  mission:
    "Persistent memory infrastructure for AI agents — built so every conversation starts where the last one left off.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Capabilities", href: "#capabilities" },
        { label: "Architecture", href: "#architecture" },
        { label: "Integrations", href: "#integrations" },
        { label: "Pricing", href: "#pricing" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ],
};
