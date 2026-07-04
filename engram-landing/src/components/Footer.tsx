import { siteConfig, footer } from "@/content/copy";

export default function Footer() {
  return (
    <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="text-white font-bold text-lg">
              {siteConfig.name}
            </a>
            <p className="mt-2 text-xs text-muted leading-relaxed max-w-xs">
              {footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-muted-dark font-semibold mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              {footer.productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-muted-dark font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footer.companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-muted-dark font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footer.legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="text-xs tracking-[0.15em] uppercase text-muted-dark font-semibold mt-6 mb-3">
              Social
            </h4>
            <ul className="space-y-2">
              {footer.socials.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-dark">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {footer.legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-dark hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
