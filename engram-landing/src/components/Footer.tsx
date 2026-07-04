import { siteConfig, footer } from "@/content/copy";

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <line x1="6" y1="7" x2="17" y2="12" stroke="var(--ink)" strokeWidth="1.4" opacity="0.28" />
                <line x1="6" y1="17" x2="17" y2="12" stroke="var(--ink)" strokeWidth="1.4" opacity="0.28" />
                <circle cx="6" cy="7" r="2.6" fill="var(--ink)" />
                <circle cx="6" cy="17" r="2.6" fill="var(--ink)" />
                <circle cx="17" cy="12" r="3.4" fill="var(--accent)" />
              </svg>
              <span className="text-xl font-medium tracking-tight text-ink">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {footer.mission}
            </p>
          </div>

          {/* link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
