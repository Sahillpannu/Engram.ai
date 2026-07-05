# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/


# Design Language
- Design aesthetic should feel like Linear, Vercel, Cursor, Stripe, or Claude — premium, calm, technical, trustworthy, and infrastructure-first. Confidence: 0.85
- Avoid cyberpunk, neon blue glows, pure black backgrounds, excessive gradients, over-the-top animations, particles, stars, noise textures, film grain, TV static, flickering effects, bouncy springs, and toy-like motion. Confidence: 0.85
- Depth should be conveyed through borders, subtle contrast, and ambient glows — never use shadows or elevation. Confidence: 0.85
- Animations should feel like Apple, Linear, or Cursor: subtle, use Framer Motion with duration 0.5-0.8s and easing [0.22, 1, 0.36, 1]. Confidence: 0.85
- Motion should come from the product visualization itself (memory graph, data packets, flowing connections), not from page background effects. The background should be calm and still. Confidence: 0.80

# Color System
- Dark mode is the default theme; background: #0b0b0a (not pure black), cards: #141413, borders: rgba(255,255,255,0.08), text: #f7f7f4, muted: #a1a1aa. Confidence: 0.85
- Primary accent is orange (#ff6b2c), used sparingly only on primary buttons, active states, memory node highlights, and animated data packets. Confidence: 0.85

# Typography
- Use Geist as the primary font (fallback: Inter, system-ui) with JetBrains Mono for code, architecture labels, metadata, badges, and section labels. Confidence: 0.85
- Typography should be editorial: never use bold giant headings; hero H1 at 72px/400 weight/-0.06em tracking, body at 18px/1.7 line-height. Confidence: 0.85
