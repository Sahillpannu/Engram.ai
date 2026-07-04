export const siteConfig = {
  name: "Engram",
  tagline: "Persistent memory for AI agents.",
  description:
    "Engram is a persistent memory layer that turns your emails, meetings, and calendar into long-term memory an AI agent can reason over and act on.",
};

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Architecture", href: "#architecture" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  line1: "Your AI agent is smart but forgetful.",
  line2: "Engram gives it a brain.",
  subheading:
    "A persistent memory layer that turns your emails, meetings, and calendar into long-term memory your AI agent can reason over and act on — so every conversation starts where the last one left off.",
  integrationsCaption: "Gmail · Google Calendar · Fireflies · Zoom · Qdrant",
  mockWindow: {
    title: "/memory",
    emptyState:
      "Memory not connected yet — Sign in to start building your AI brain.",
  },
};

export const problem = {
  eyebrow: "THE PROBLEM",
  headline: "Every new chat starts from zero.",
  body: "Today's AI assistants are intelligent but suffer from digital amnesia. They forget everything between sessions — important emails from weeks ago, decisions made in meetings, ongoing projects, and the context of your past conversations.",
  forgetsTitle: "What your AI forgets:",
  forgets: [
    { icon: "Mail", text: "Important emails from weeks ago" },
    { icon: "CalendarClock", text: "Decisions made in meetings" },
    { icon: "Briefcase", text: "Ongoing projects and their status" },
    { icon: "Users", text: "People, companies, and relationships" },
    { icon: "MessageSquare", text: "Context from past conversations" },
  ],
};

export const architecture = {
  eyebrow: "THE SOLUTION",
  headline: "Engram builds your personal AI brain.",
  body: "Engram continuously collects information from your digital world, filters what's valuable, converts it into long-term memory, and lets an AI agent reason over it — so your agent always has the context it needs.",
  stages: [
    {
      id: "inputs",
      title: "Data Sources",
      items: ["Gmail", "Google Calendar", "Fireflies", "Zoom"],
      icon: "Inbox",
    },
    {
      id: "pipeline",
      title: "Ingestion Pipeline",
      description:
        "Real-time webhooks and Pub/Sub push events into the processing queue.",
      icon: "GitBranch",
    },
    {
      id: "filter",
      title: "LLM Memory Filter",
      description:
        "GPT-4.1-mini classifies what's worth remembering and discards noise.",
      icon: "Brain",
    },
    {
      id: "embed",
      title: "OpenAI Embeddings",
      description:
        "text-embedding-3-small converts filtered knowledge into vector embeddings.",
      icon: "Layers",
    },
    {
      id: "store",
      title: "Qdrant Vector Memory",
      description:
        "High-performance vector search stores and indexes your memory.",
      icon: "Database",
    },
    {
      id: "agent",
      title: "GPT-4.1 Agent",
      description:
        "The agent retrieves relevant memory via RAG to answer questions and take action.",
      icon: "Bot",
    },
    {
      id: "output",
      title: "Answers & Actions",
      description:
        "Email replies, calendar updates, meeting summaries — all grounded in memory.",
      icon: "Zap",
    },
  ],
};

export const capabilities = {
  eyebrow: "CAPABILITIES",
  headline: "Everything you need for a persistent AI memory",
  subtext: "Built for Gmail, Calendar, and Meetings — not generic memory infra.",
  items: [
    {
      icon: "Bot",
      title: "AI Agent",
      description:
        "GPT-4.1 powered reasoning with multi-step tool execution and tool chaining.",
    },
    {
      icon: "Brain",
      title: "Persistent Memory",
      description:
        "Context-aware responses that carry across every conversation.",
    },
    {
      icon: "Mail",
      title: "Gmail Intelligence",
      description:
        "Search inbox, read full threads, draft and send replies directly.",
    },
    {
      icon: "Tags",
      title: "Native Gmail Categories",
      description:
        "Inbox / Updates / Social / Promotions matched to Gmail's real CATEGORY_* labels.",
    },
    {
      icon: "MailCheck",
      title: "Full Mail Management",
      description:
        "Real Drafts API integration, synced Sent, on-demand Spam/Trash.",
    },
    {
      icon: "RefreshCw",
      title: "Real-time Sync",
      description:
        "Gmail changes pushed via Google Pub/Sub with automatic watch renewal.",
    },
    {
      icon: "Calendar",
      title: "Calendar Intelligence",
      description:
        "View, create, and update events; find free slots in natural language.",
    },
    {
      icon: "HardDrive",
      title: "Local-First Architecture",
      description:
        "Sub-second loads via local caching + cooldown-based background sync.",
    },
    {
      icon: "Video",
      title: "Meeting Intelligence",
      description:
        "Zoom handles scheduling, Fireflies transcribes, both feed vector memory.",
    },
  ],
};

export const howItWorks = {
  eyebrow: "HOW IT WORKS",
  headline: "From inbox to memory in four steps",
  subtext:
    "Scroll — each step appears in sequence, connected by animated dashed lines.",
  steps: [
    {
      number: "01",
      tab: "Data lands",
      title: "Data lands",
      icon: "ArrowDownToLine",
      description:
        "New emails, events, and meeting transcripts flow in through Gmail Pub/Sub, Calendar sync, and Fireflies webhooks.",
    },
    {
      number: "02",
      tab: "Engram filters it",
      title: "Engram filters it",
      icon: "Filter",
      description:
        "GPT-4.1-mini decides what's actually worth remembering, discarding noise like newsletters and spam.",
    },
    {
      number: "03",
      tab: "Memory is embedded",
      title: "Memory is embedded",
      icon: "Layers",
      description:
        "Valuable knowledge is embedded via text-embedding-3-small and stored in Qdrant vector memory.",
    },
    {
      number: "04",
      tab: "Agent acts",
      title: "Agent acts",
      icon: "Zap",
      description:
        "GPT-4.1 retrieves relevant memory via RAG and answers questions or takes action for you.",
    },
  ],
};

export const integrations = [
  { name: "Gmail", icon: "Mail" },
  { name: "Google Calendar", icon: "Calendar" },
  { name: "Fireflies", icon: "Video" },
  { name: "Zoom", icon: "Monitor" },
  { name: "OpenAI", icon: "Sparkles" },
  { name: "Qdrant", icon: "Database" },
  { name: "PostgreSQL", icon: "Server" },
  { name: "Next.js", icon: "Code" },
];

export const faq = {
  eyebrow: "FAQ",
  headline: "Frequently asked questions",
  items: [
    {
      question: "What is Engram?",
      answer:
        "Engram is a persistent memory layer for AI agents. It connects to your Gmail, Calendar, and meetings, extracts and embeds valuable knowledge, and gives your AI agent long-term memory it can reason over across every conversation.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes. Your data never leaves your control. Engram processes data on your behalf and stores embeddings in your own Qdrant instance. We do not train on your data, sell it, or share it with third parties.",
    },
    {
      question: "Which providers are supported?",
      answer:
        "Currently we support Gmail, Google Calendar, Fireflies, and Zoom. More integrations are planned based on user demand.",
    },
    {
      question: "Do I need to keep a tab open?",
      answer:
        "No. Engram runs in the background — it listens for new data via Gmail Pub/Sub and Fireflies webhooks, processes it automatically, and updates your memory without you needing to keep anything open.",
    },
    {
      question: "What's the pricing?",
      answer:
        "Engram is currently in early access. We're onboarding users gradually — join the waitlist and we'll reach out with details as we open up.",
    },
    {
      question:
        "How is this different from just using ChatGPT with search or long context?",
      answer:
        "Unlike long-context windows which eventually fill up, or search which requires you to know what to look for, Engram maintains a persistent, searchable memory that grows intelligently over time. Your agent remembers across sessions without you having to re-explain everything.",
    },
  ],
};

export const cta = {
  headline: "Give your AI agent a memory.",
  subtext:
    "Connect Gmail in under a minute. No configuration, no vector database setup — just sign in and Engram starts learning.",
  disclaimer:
    "Early access · No credit card required · Privacy-first by design",
};

export const footer = {
  tagline: "Persistent memory for AI agents — built on Gmail, Calendar, and Meetings.",
  productLinks: [
    { label: "Features", href: "#capabilities" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Integrations", href: "#integrations" },
    { label: "Changelog", href: "#" },
  ],
  companyLinks: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  socials: [
    { label: "Twitter", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};
