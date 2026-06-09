"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useI18n, type Locale } from "@/context/i18n";
import { useTheme } from "@/context/theme";

/* Flag SVGs inlined to avoid external deps */
const FlagEN = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
    <rect width="20" height="14" fill="#012169" />
    <path d="M0 0 L20 14 M20 0 L0 14" stroke="white" strokeWidth="2.8" />
    <path d="M0 0 L20 14 M20 0 L0 14" stroke="#C8102E" strokeWidth="1.6" />
    <path d="M10 0 V14 M0 7 H20" stroke="white" strokeWidth="4.4" />
    <path d="M10 0 V14 M0 7 H20" stroke="#C8102E" strokeWidth="2.4" />
  </svg>
);

const FlagPT = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
    <rect width="8" height="14" fill="#006600" />
    <rect x="8" width="12" height="14" fill="#FF0000" />
    <circle cx="8" cy="7" r="3" fill="#FFD700" stroke="#000" strokeWidth="0.5" />
  </svg>
);

const LOCALES: { code: Locale; label: string; Flag: React.FC }[] = [
  { code: "en", label: "EN", Flag: FlagEN },
  { code: "pt", label: "PT", Flag: FlagPT },
];

const switcherBtnClass =
  "flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] hover:border-[var(--color-amber)] transition-colors text-xs font-mono tracking-widest text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)]";

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close lang dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.clients, href: "#clients" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const currentLang = LOCALES.find((l) => l.code === locale)!;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-nav-scrolled-bg)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group" aria-label="Farol Tech home">
              <BeaconIcon />
              <span
                className="font-display text-xl font-light tracking-wide text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Farol<span className="text-[var(--color-amber)]">.</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`${switcherBtnClass} hidden md:flex justify-center w-[34px] px-0`}
                aria-label={t.nav.toggleTheme}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Language switcher */}
              <div ref={langRef} className="relative hidden md:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={switcherBtnClass}
                  aria-label="Switch language"
                >
                  <currentLang.Flag />
                  <span>{currentLang.label}</span>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 border border-[var(--color-border)] bg-[var(--color-surface-2)] min-w-[5rem] overflow-hidden"
                    >
                      {LOCALES.filter((l) => l.code !== locale).map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLocale(l.code); setLangOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono tracking-widest text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-3)] transition-colors"
                        >
                          <l.Flag />
                          {l.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="hidden md:inline-flex btn-primary text-sm"
              >
                {t.nav.cta}
              </a>

              {/* Mobile hamburger */}
              <button
                className="md:hidden text-[var(--color-ink)] p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[var(--color-surface-1)] flex flex-col pt-20 px-6 pb-10"
          >
            <nav className="flex flex-col gap-1 mt-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 border-b border-[var(--color-border)] font-display text-2xl font-light text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              {/* Mobile language & theme */}
              <div className="flex gap-2">
                <button
                  onClick={toggleTheme}
                  className={`${switcherBtnClass} px-3 py-2`}
                  aria-label={t.nav.toggleTheme}
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLocale(l.code)}
                    className={`flex items-center gap-2 px-3 py-2 border text-xs font-mono tracking-widest transition-colors ${
                      locale === l.code
                        ? "border-[var(--color-amber)] text-[var(--color-amber)] bg-[var(--color-amber-glow)]"
                        : "border-[var(--color-border)] text-[var(--color-ink-secondary)]"
                    }`}
                  >
                    <l.Flag />
                    {l.label}
                  </button>
                ))}
              </div>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary justify-center">
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BeaconIcon() {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <div className="w-3 h-3 rounded-full bg-[var(--color-amber)]" />
      <span className="beacon-ring absolute w-3 h-3" />
      <span className="beacon-ring absolute w-3 h-3" style={{ animationDelay: "1s" }} />
    </div>
  );
}
