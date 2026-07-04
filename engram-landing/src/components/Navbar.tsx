"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig, navLinks } from "@/content/copy";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-white font-bold text-xl tracking-tight">
            {siteConfig.name}
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a className="text-sm text-muted hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg border border-transparent hover:border-border">
              Log in
            </a>
            <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-accent-light hover:text-white transition-all duration-200">
              Connect Gmail
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-muted hover:text-white transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center space-x-3 pt-2">
              <a className="text-sm text-muted hover:text-white transition-colors px-4 py-2 rounded-lg border border-border">
                Log in
              </a>
              <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg">
                Connect Gmail
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
