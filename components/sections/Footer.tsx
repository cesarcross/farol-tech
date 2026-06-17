"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import { useI18n } from "@/context/i18n";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-surface-1)]">
      {/* Ambient amber bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-amber)] to-transparent opacity-30" />

      <div className="container-custom py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* <BeaconMark /> */}
              <span
                className="font-display text-2xl font-light text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Farol Tech<span className="text-[var(--color-amber)]">.</span>
              </span>
            </div>
            <p className="text-sm text-[var(--color-ink-subtle)] italic" style={{ fontFamily: "var(--font-display)" }}>
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { Icon: Github, href: "https://github.com", label: "GitHub" },
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-ink-subtle)] hover:text-[var(--color-amber)] hover:border-[var(--color-amber)] transition-colors"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Offices */}
          <div>
            <h3 className="label-tag text-[var(--color-ink-secondary)] mb-5">
              {t.footer.offices}
            </h3>
            <ul className="space-y-3 text-sm text-[var(--color-ink-subtle)]">
              <li className="flex items-center gap-2">
                <span className="text-[var(--color-amber)]">→</span>
                {t.footer.lisbon}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[var(--color-amber)]">→</span>
                {t.footer.london}
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="label-tag text-[var(--color-ink-secondary)] mb-5">
              {t.footer.links_label}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "#services", label: t.footer.services },
                { href: "#clients", label: t.footer.clients },
                { href: "#contact", label: t.footer.contact },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-ink-subtle)] hover:text-[var(--color-amber)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-ink-subtle)]">
          <p>
            © {currentYear} Farol Tech. {t.footer.legal}
          </p>
          <a
            href="/privacy"
            className="hover:text-[var(--color-amber)] transition-colors"
          >
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}

function BeaconMark() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-amber)]" />
    </div>
  );
}
